import React, { useState, useRef, DragEvent, ChangeEvent } from 'react';
import { Upload, Video, X, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { uploadResidentialMediaToS3 } from '../../utils/residentialMediaUploader';

interface MediaItem {
  id: string;
  file: File | string;
  preview: string;
  category: string;
  type: 'photo' | 'video';
  uploaded?: boolean;
  url?: string;
  title?: string;
}

interface ResidentialMediaUploadProps {
  propertyType: string;
  propertyId?: string;
  onMediaItemsChange: (items: any[]) => void;
  initialMediaItems?: any[];
  categories: string[];
}

const ResidentialMediaUpload: React.FC<ResidentialMediaUploadProps> = ({
  propertyType,
  propertyId,
  onMediaItemsChange,
  initialMediaItems = [],
  categories
}) => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(
    initialMediaItems.map(item => ({
      ...item,
      preview: item.url,
      uploaded: true
    }))
  );
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, category: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files, category);
  };

  const handleFileSelect = (files: FileList | null, category: string) => {
    if (!files || files.length === 0) return;
    handleFiles(Array.from(files), category);
  };

  const handleFiles = (files: File[], category: string) => {
    const newItems: MediaItem[] = [];
    
    files.forEach(file => {
      // Check if file is an image or video
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error('Only image and video files are allowed');
        return;
      }

      const preview = URL.createObjectURL(file);
      newItems.push({
        id: uuidv4(),
        file,
        preview,
        category,
        type: file.type.startsWith('image/') ? 'photo' : 'video',
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
      file: item.file as File,
      title: item.title,
      category: item.category
    }));
    
    // Show loading toast
    toast.loading('Uploading media to S3...', { id: 'media-upload' });
    
    try {
      const uploadedItems = await uploadResidentialMediaToS3(
        propertyType,
        itemsToUpload,
        propertyId
      );
      
      // Show success toast
      toast.success(`Successfully uploaded ${uploadedItems.length} files`, { id: 'media-upload' });
      
      // Update local state with uploaded items
      setMediaItems(prev => prev.map(item => {
        const uploadedItem = uploadedItems.find(ui => ui.id === item.id);
        if (uploadedItem) {
          return {
            ...item,
            url: uploadedItem.url,
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
    <div className="space-y-4">
      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {categories.map(category => (
        <div key={category} className="space-y-2">
          <h3 className="text-lg font-semibold capitalize">{category}</h3>
          
          <div
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="image/*,video/*"
              onChange={(e) => handleFileSelect(e.target.files, category)}
            />
            <div className="flex flex-col items-center space-y-2">
              <Upload className="w-8 h-8 text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag and drop files here, or click to select files
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaItems
              .filter(item => item.category === category)
              .map(item => (
                <div key={item.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                    {item.type === 'video' ? (
                      <div className="h-full flex items-center justify-center">
                        <Video className="w-8 h-8 text-gray-400" />
                      </div>
                    ) : (
                      <img
                        src={item.preview}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {item.uploaded && (
                    <div className="absolute bottom-2 right-2">
                      <div className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                        Uploaded
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      ))}

      <div className="flex justify-end space-x-4">
        <button
          onClick={uploadMedia}
          disabled={uploading || mediaItems.filter(item => !item.uploaded).length === 0}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {uploading ? 'Uploading...' : 'Upload Media'}
        </button>
      </div>
    </div>
  );
};

export default ResidentialMediaUpload; 