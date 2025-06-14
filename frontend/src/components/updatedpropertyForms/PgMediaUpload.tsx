import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { Upload, Video, FileText, X } from 'lucide-react';
import { uploadPgMediaToS3 } from '../../utils/pgMediaUploader';

interface MediaItem {
  id: string;
  file: File | string;
  preview: string;
  title?: string;
  tags?: string[];
  roomType?: string;
  category: string;
  type: 'photo' | 'video' | 'document';
  uploaded?: boolean;
  url?: string;
}

// No need for a separate interface for the upload function

interface PgMediaUploadProps {
  propertyId?: string;
  initialMedia?: {
    photos?: { [category: string]: string[] };
    videoTour?: string;
    documents?: string[];
  };
  onMediaItemsChange: (mediaItems: any[]) => void;
}

const PgMediaUpload: React.FC<PgMediaUploadProps> = ({
  propertyId,
  initialMedia,
  onMediaItemsChange
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize from props if available
  useEffect(() => {
    if (initialMedia) {
      const items: MediaItem[] = [];
      
      // Process photos
      if (initialMedia.photos) {
        Object.entries(initialMedia.photos).forEach(([category, urls]) => {
          urls.forEach(url => {
            items.push({
              id: uuidv4(),
              file: url,
              preview: url,
              category,
              type: 'photo',
              uploaded: true,
              url
            });
          });
        });
      }
      
      // Process video
      if (initialMedia.videoTour) {
        items.push({
          id: uuidv4(),
          file: initialMedia.videoTour,
          preview: initialMedia.videoTour,
          category: 'videoTour',
          type: 'video',
          uploaded: true,
          url: initialMedia.videoTour
        });
      }
      
      // Process documents
      if (initialMedia.documents) {
        initialMedia.documents.forEach(url => {
          items.push({
            id: uuidv4(),
            file: url,
            preview: url,
            category: 'documents',
            type: 'document',
            uploaded: true,
            url
          });
        });
      }
      
      if (items.length > 0) {
        setMediaItems(items);
      }
    }
  }, [initialMedia]);
  
  const handleFileSelect = (files: FileList | null, category: string, type: 'photo' | 'video' | 'document') => {
    if (!files || files.length === 0) return;
    
    const newItems: MediaItem[] = [];
    
    Array.from(files).forEach(file => {
      const preview = URL.createObjectURL(file);
      newItems.push({
        id: uuidv4(),
        file,
        preview,
        category,
        type,
        uploaded: false
      });
    });
    
    setMediaItems(prev => [...prev, ...newItems]);
  };
  
  const uploadMedia = async () => {
    const items = mediaItems.filter(item => !item.uploaded && item.file instanceof File);
    
    if (items.length === 0) {
      toast.success('No new files to upload');
      return;
    }
    
    setUploading(true);
    setError(null);
    
    // Prepare items for S3 upload
    const itemsToUpload = items.map(item => ({
      id: item.id,
      type: item.type,
      file: item.file as File,  // Type assertion since we filtered for File instances above
      title: item.title,
      tags: item.tags,
      roomType: item.roomType,
      category: item.category
    }));
    
    // Show loading toast
    toast.loading('Uploading media to S3...', { id: 'media-upload' });
    
    try {
      // Always upload to S3 regardless of propertyId
      // propertyId is optional and passed as the second parameter
      // Use type assertion to match the expected type in the uploadPgMediaToS3 function
      const uploadedItems = await uploadPgMediaToS3(itemsToUpload as any, propertyId);
      
      // Show success toast
      toast.success(`Successfully uploaded ${uploadedItems.length} files`, { id: 'media-upload' });
      
      // Update local state with uploaded items
      setMediaItems(prev => prev.map(item => {
        const uploadedItem = uploadedItems.find(ui => ui.id === item.id);
        if (uploadedItem) {
          return {
            ...item,
            url: uploadedItem.url, // Use the S3 URL
            uploaded: true
          };
        }
        return item;
      }));
      
      // Update parent component with uploaded items
      onMediaItemsChange(uploadedItems);
    } catch (uploadError: any) {
      console.error('Error uploading to S3:', uploadError);
      toast.error(`Error uploading: ${uploadError.message}`, { id: 'media-upload' });
      setError(uploadError.message || 'Failed to upload media to server');
    } finally {
      setUploading(false);
    }
  };
  
  const removeItem = (id: string) => {
    setMediaItems(prev => prev.filter(item => item.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Media Upload</h3>
        
        {/* File input sections */}
        <div className="space-y-4">
          {/* Photo upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Photos</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                 onClick={() => document.getElementById('photo-upload')?.click()}
            >
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">Click to upload photos</p>
              <input
                id="photo-upload"
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files, 'photos', 'photo')}
              />
            </div>
          </div>
          
          {/* Video upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Video Tour</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                 onClick={() => document.getElementById('video-upload')?.click()}
            >
              <Video className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">Click to upload video</p>
              <input
                id="video-upload"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files, 'videoTour', 'video')}
              />
            </div>
          </div>
          
          {/* Document upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Documents</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                 onClick={() => document.getElementById('document-upload')?.click()}
            >
              <FileText className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-1 text-sm text-gray-500">Click to upload documents</p>
              <input
                id="document-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files, 'documents', 'document')}
              />
            </div>
          </div>
        </div>
        
        {/* Media preview */}
        {mediaItems.length > 0 && (
          <div className="mt-6">
            <h4 className="text-md font-medium mb-2">Selected Media</h4>
            <ul className="space-y-2">
              {mediaItems.map(item => (
                <li key={item.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    {item.type === 'photo' && (
                      <img src={item.preview} alt="Preview" className="w-10 h-10 object-cover rounded" />
                    )}
                    {item.type === 'video' && (
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    {item.type === 'document' && (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm truncate max-w-xs">
                        {item.file instanceof File ? item.file.name : 'Uploaded file'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.uploaded ? 'Uploaded' : 'Pending upload'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Upload button */}
        <div className="mt-6">
          <button
            type="button"
            onClick={uploadMedia}
            disabled={uploading || mediaItems.filter(item => !item.uploaded && item.file instanceof File).length === 0}
            className={`px-4 py-2 rounded-lg ${uploading || mediaItems.filter(item => !item.uploaded && item.file instanceof File).length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PgMediaUpload;
