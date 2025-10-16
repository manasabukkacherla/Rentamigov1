import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Video, X, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { uploadResidentialMediaToS3 } from '../../utils/residentialMediaUploader';

interface MediaItem {
  id: string;
  file: File | string;
  preview: string;
  category: string;
  type: 'photo' | 'video' | 'document';
  uploaded?: boolean;
  url?: string;
}

interface IMedia {
  photos: {
    exterior: (File | string)[];
    interior: (File | string)[];
    floorPlan: (File | string)[];
    washrooms: (File | string)[];
    lifts: (File | string)[];
    emergencyExits: (File | string)[];
    bedrooms: (File | string)[];
    halls: (File | string)[];
    storerooms: (File | string)[];
    kitchen: (File | string)[];
  };
  videoTour?: File | string;
  documents: (File | string)[];
}

interface ResidentialPropertyMediaUploadProps {
  propertyType: string;
  propertyId?: string;
  value: IMedia;
  onChange: (media: IMedia) => void;
}

const ResidentialPropertyMediaUpload: React.FC<ResidentialPropertyMediaUploadProps> = ({
  propertyType,
  propertyId,
  value,
  onChange
}) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoCategories = {
    exterior: 'Exterior Photos',
    interior: 'Interior Photos',
    floorPlan: 'Floor Plan',
    washrooms: 'Washrooms',
    lifts: 'Lifts',
    emergencyExits: 'Emergency Exits',
    bedrooms: 'Bedrooms',
    halls: 'Halls',
    storerooms: 'Store Rooms',
    kitchen: 'Kitchen'
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>, category: string, type: 'photo' | 'video' | 'document') => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files, category, type);
  };

  const handleFileSelect = async (files: FileList | null, category: string, type: 'photo' | 'video' | 'document') => {
    if (!files || files.length === 0) return;
    await handleFiles(Array.from(files), category, type);
  };

  const handleFiles = async (files: File[], category: string, type: 'photo' | 'video' | 'document') => {
    // Validate file types
    const validFiles = files.filter(file => {
      if (type === 'photo' && !file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (type === 'video' && !file.type.startsWith('video/')) {
        toast.error(`${file.name} is not a video file`);
        return false;
      }
      if (type === 'document' && !file.type.includes('pdf')) {
        toast.error(`${file.name} is not a PDF document`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setUploading(true);
    setError(null);

    try {
      // Prepare items for S3 upload
      const itemsToUpload: MediaItem[] = await Promise.all(validFiles.map(async file => {
        const preview = type === 'photo' ? URL.createObjectURL(file) : '';
        return {
          id: uuidv4(),
          type,
          file,
          category,
          preview,
          uploaded: false
        };
      }));

      // Upload to S3
      const uploadedItems = await uploadResidentialMediaToS3(
        propertyType,
        itemsToUpload.map(item => ({
          ...item,
          file: item.file instanceof File ? item.file : new File([], '')
        })),
        propertyId
      );

      // Update the form state based on category
      const newValue = { ...value };

      uploadedItems.forEach(item => {
        if (item.type === 'photo') {
          if (category in newValue.photos) {
            (newValue.photos as any)[category].push(item.url);
          }
        } else if (item.type === 'video') {
          newValue.videoTour = item.url;
        } else if (item.type === 'document') {
          newValue.documents.push(item.url);
        }
      });

      onChange(newValue);
      toast.success(`Successfully uploaded ${uploadedItems.length} files`);
    } catch (uploadError: any) {
      console.error('Error uploading to S3:', uploadError);
      toast.error(`Error uploading: ${uploadError.message}`);
      setError(uploadError.message || 'Failed to upload media to server');
    } finally {
      setUploading(false);
    }
  };

  const removeItem = (category: string, index: number, type: 'photo' | 'video' | 'document') => {
    const newValue = { ...value };
    
    if (type === 'photo') {
      if (category in newValue.photos) {
        const photos = (newValue.photos as any)[category];
        photos.splice(index, 1);
        onChange(newValue);
      }
    } else if (type === 'video') {
      newValue.videoTour = undefined;
      onChange(newValue);
    } else if (type === 'document') {
      newValue.documents.splice(index, 1);
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Photo Categories */}
      {Object.entries(photoCategories).map(([key, label]) => (
        <div key={key} className="space-y-2">
          <h3 className="text-lg font-semibold">{label}</h3>
          
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, key, 'photo')}
            onClick={() => document.getElementById(`photo-input-${key}`)?.click()}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
          >
            <input
              id={`photo-input-${key}`}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files, key, 'photo')}
            />
            <div className="flex flex-col items-center space-y-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag and drop photos here, or click to select
              </p>
            </div>
          </div>

          {/* Display uploaded photos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {(value.photos as any)[key].map((url: string, index: number) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={typeof url === 'string' ? url : URL.createObjectURL(url)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => removeItem(key, index, 'photo')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Video Tour */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Video Tour</h3>
        
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'videoTour', 'video')}
          onClick={() => document.getElementById('video-input')?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input
            id="video-input"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files, 'videoTour', 'video')}
          />
          <div className="flex flex-col items-center space-y-2">
            <Video className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop a video here, or click to select
            </p>
          </div>
        </div>

        {/* Display uploaded video */}
        {value.videoTour && (
          <div className="relative group">
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              <Video className="w-12 h-12 text-gray-400" />
            </div>
            <button
              onClick={() => removeItem('videoTour', 0, 'video')}
              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Documents */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Documents</h3>
        
        <div
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, 'documents', 'document')}
          onClick={() => document.getElementById('document-input')?.click()}
          className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <input
            id="document-input"
            type="file"
            accept=".pdf"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files, 'documents', 'document')}
          />
          <div className="flex flex-col items-center space-y-2">
            <FileText className="w-8 h-8 text-gray-400" />
            <p className="text-sm text-gray-500">
              Drag and drop PDF documents here, or click to select
            </p>
          </div>
        </div>

        {/* Display uploaded documents */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {value.documents.map((item: File | string, index: number) => {
            const url = typeof item === 'string' ? item : URL.createObjectURL(item);
            return (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <button
                  onClick={() => removeItem('documents', index, 'document')}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {uploading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-center">Uploading media...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentialPropertyMediaUpload; 