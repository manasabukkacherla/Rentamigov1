import React, { useState, useRef, DragEvent, useEffect } from 'react';
import { Upload, Camera, Video, FileText, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { uploadPropertyMediaToS3 } from '../../utils/propertyMediaUploader';

interface MediaFile {
  id: string;
  file: File | string;
  preview: string;
  category: string;
  type: 'photo' | 'video' | 'document';
  uploaded?: boolean;
  url?: string;
}

interface PropertyMediaUploadProps {
  propertyId?: string;
  propertyType: string; // 'apartment', 'builderFloor', 'independentHouse', etc.
  initialMedia?: {
    photos?: {
      [category: string]: string[];
    };
    videoTour?: string;
    documents?: string[];
  };
  onMediaChange: (media: {
    photos: {
      [category: string]: string[];
    };
    videoTour?: string;
    documents?: string[];
  }) => void;
}

const PropertyMediaUpload: React.FC<PropertyMediaUploadProps> = ({
  propertyId,
  propertyType,
  initialMedia = { photos: {}, documents: [] },
  onMediaChange,
}): React.ReactElement => {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  
  // Ref callback function to properly handle element assignment
  const setFileInputRef = (category: string) => (el: HTMLInputElement | null): void => {
    fileInputRefs.current[category] = el;
  };

  // Photo categories
  const photoCategories = [
    { id: 'exterior', label: 'Exterior Views' },
    { id: 'interior', label: 'Interior Views' },
    { id: 'floorPlan', label: 'Floor Plan' },
    { id: 'washrooms', label: 'Washrooms' },
    { id: 'lifts', label: 'Lifts' },
    { id: 'emergencyExits', label: 'Emergency Exits' },
    { id: 'bedrooms', label: 'Bedrooms' },
    { id: 'halls', label: 'Halls' },
    { id: 'storerooms', label: 'Storerooms' },
    { id: 'kitchen', label: 'Kitchen' },
  ];

  // Initialize media from props - only runs when initialMedia actually changes
  useEffect(() => {
    // Skip processing if we don't have initial media data
    if (!initialMedia) return;
    
    const files: MediaFile[] = [];

    // Process initial photos
    if (initialMedia.photos) {
      Object.entries(initialMedia.photos).forEach(([category, urls]) => {
        urls.forEach((url) => {
          if (typeof url === 'string' && url) {
            files.push({
              id: uuidv4(),
              file: url,
              preview: url,
              category,
              type: 'photo',
              uploaded: true,
              url,
            });
          }
        });
      });
    }

    // Process initial video
    if (initialMedia.videoTour) {
      files.push({
        id: uuidv4(),
        file: initialMedia.videoTour,
        preview: initialMedia.videoTour,
        category: 'videoTour',
        type: 'video',
        uploaded: true,
        url: initialMedia.videoTour,
      });
    }

    // Process initial documents
    if (initialMedia.documents) {
      initialMedia.documents.forEach((url) => {
        if (typeof url === 'string' && url) {
          files.push({
            id: uuidv4(),
            file: url,
            preview: url,
            category: 'documents',
            type: 'document',
            uploaded: true,
            url,
          });
        }
      });
    }

    if (files.length > 0) {
      setMediaFiles(files);
    }
  }, [initialMedia]);

  // Update parent component when media changes
  useEffect(() => {
    const photos: { [category: string]: string[] } = {};
    let videoTour: string | undefined;
    const documents: string[] = [];

    // Group files by category
    mediaFiles.forEach((file) => {
      if (file.type === 'photo') {
        if (!photos[file.category]) {
          photos[file.category] = [];
        }
        if (file.uploaded && file.url) {
          photos[file.category].push(file.url);
        }
      } else if (file.type === 'video' && file.uploaded && file.url) {
        videoTour = file.url;
      } else if (file.type === 'document' && file.uploaded && file.url) {
        documents.push(file.url);
      }
    });

    // Only update if anything has changed to prevent unnecessary renders
    const mediaPayload = {
      photos,
      videoTour,
      documents,
    };
    
    // Update parent component
    onMediaChange(mediaPayload);
  }, [mediaFiles]); // Removed onMediaChange from dependencies

  // Handle file selection
  const handleFileSelect = (category: string, type: 'photo' | 'video' | 'document', files: FileList | null) => {
    if (!files || files.length === 0) return;

    // Convert FileList to array
    const fileArray = Array.from(files);

    // Validate file types
    const validFiles = fileArray.filter((file) => {
      if (type === 'photo' && !file.type.startsWith('image/')) {
        toast.error(`File ${file.name} is not a valid image.`);
        return false;
      } else if (type === 'video' && !file.type.startsWith('video/')) {
        toast.error(`File ${file.name} is not a valid video.`);
        return false;
      } else if (type === 'document' && !file.type.match(/pdf|msword|vnd.openxmlformats-officedocument|vnd.ms-excel/)) {
        toast.error(`File ${file.name} is not a valid document.`);
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    // For videos, only allow one file
    if (type === 'video') {
      // Remove any existing video files
      setMediaFiles((prev) => prev.filter((file) => file.type !== 'video'));
      
      // Add the new video file
      const videoFile = validFiles[0];
      const preview = URL.createObjectURL(videoFile);
      
      console.log('Adding video file:', {
        name: videoFile.name,
        size: videoFile.size,
        type: videoFile.type,
        category: 'videoTour' // Always use videoTour for videos
      });
      
      setMediaFiles((prev) => [
        ...prev,
        {
          id: uuidv4(),
          file: videoFile,
          preview,
          category: 'videoTour', // Always use videoTour for videos
          type: 'video',
          uploaded: false,
        },
      ]);
      
      toast.success(`Video ${videoFile.name} added successfully.`);
      return;
    }

    // For photos and documents, add all valid files
    const newFiles = validFiles.map((file) => {
      const preview = URL.createObjectURL(file);
      return {
        id: uuidv4(),
        file,
        preview,
        category,
        type,
        uploaded: false,
      };
    });

    setMediaFiles((prev) => [...prev, ...newFiles]);
    toast.success(`${newFiles.length} file(s) added successfully.`);
  };

  // Handle drag over
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Handle drop
  const handleDrop = (e: DragEvent<HTMLDivElement>, category: string, type: 'photo' | 'video' | 'document') => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(category, type, e.dataTransfer.files);
  };

  // Remove file
  const removeFile = (id: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.id !== id));
  };

  // Remove all files in a category
  const removeAllFiles = (category: string) => {
    setMediaFiles((prev) => prev.filter((file) => file.category !== category));
  };

  // Upload media to S3
  const uploadMedia = async () => {
    // Filter out already uploaded files
    const filesToUpload = mediaFiles.filter(file => 
      !file.uploaded && file.file instanceof File
    );

    if (filesToUpload.length === 0) {
      toast.success('No new files to upload');
      return;
    }

    setUploading(true);
    setError(null);
    
    // Show initial loading toast
    toast.loading('Preparing to upload media files...', { id: 'media-upload' });
    
    try {
      // STEP 1: Prepare files for upload with proper categorization
      const mediaItemsToUpload = filesToUpload.map(file => {
        // Ensure proper category for videos
        const category = file.type === 'video' ? 'videoTour' : file.category;
        
        // Log detailed information about the file being uploaded
        console.log(`Processing ${file.type} for upload:`, {
          id: file.id,
          category,
          fileName: file.file instanceof File ? file.file.name : 'string URL',
          fileSize: file.file instanceof File ? `${(file.file.size / (1024 * 1024)).toFixed(2)} MB` : 'N/A',
          mimeType: file.file instanceof File ? file.file.type : 'N/A'
        });
        
        // Return properly formatted item for upload
        return {
          id: file.id,
          type: file.type,
          file: file.file as File,
          category
        };
      });
      
      // STEP 2: Show detailed progress information
      const photoCount = mediaItemsToUpload.filter(item => item.type === 'photo').length;
      const videoCount = mediaItemsToUpload.filter(item => item.type === 'video').length;
      const docCount = mediaItemsToUpload.filter(item => item.type === 'document').length;
      
      let toastMessage = 'Uploading media files to AWS S3...';
      if (photoCount > 0) toastMessage += `\n- ${photoCount} photo${photoCount > 1 ? 's' : ''}`;
      if (videoCount > 0) toastMessage += `\n- ${videoCount} video${videoCount > 1 ? 's' : ''}`;
      if (docCount > 0) toastMessage += `\n- ${docCount} document${docCount > 1 ? 's' : ''}`;
      
      toast.loading(toastMessage, { id: 'media-upload' });
      
      // STEP 3: For videos, show periodic updates since they take longer
      let updateInterval: NodeJS.Timeout | undefined;
      if (videoCount > 0) {
        updateInterval = setInterval(() => {
          toast.loading(`Still uploading videos (${(new Date()).toLocaleTimeString()})...\nThis may take a few minutes.`, { id: 'media-upload' });
        }, 5000);
      }
      
      // STEP 4: Perform the actual upload
      console.log('Starting upload to AWS S3 with the following items:', 
        mediaItemsToUpload.map(item => ({ id: item.id, type: item.type, category: item.category })));
      
      // Call uploadPropertyMediaToS3 with propertyId (if available)
      // The utility function already handles the case when propertyId is undefined
      const uploadedItems = await uploadPropertyMediaToS3(
        propertyId || '', // Pass empty string if propertyId is undefined
        propertyType,
        mediaItemsToUpload
      );
      
      // Clear the update interval if it exists
      if (updateInterval) clearInterval(updateInterval);
      
      // STEP 5: Process the upload results
      console.log('Upload completed successfully. Results:', uploadedItems);
      
      // Check specifically for video uploads
      const uploadedVideos = uploadedItems.filter(item => item.type === 'video');
      if (uploadedVideos.length > 0) {
        uploadedVideos.forEach(video => {
          console.log('\u2705 VIDEO UPLOAD SUCCESS:', {
            id: video.id,
            url: video.url,
            category: video.category || 'videoTour'
          });
        });
      }
      
      // STEP 6: Update the UI with the uploaded files
      setMediaFiles(prev => {
        const updated = prev.map(file => {
          const uploadedItem = uploadedItems.find(item => item.id === file.id);
          if (uploadedItem) {
            console.log(`File ${file.id} successfully uploaded. URL:`, uploadedItem.url);
            return {
              ...file,
              uploaded: true,
              url: uploadedItem.url
            };
          }
          return file;
        });
        
        // Log the updated media files state
        const updatedVideos = updated.filter(file => file.type === 'video' && file.uploaded);
        if (updatedVideos.length > 0) {
          console.log('Updated video files in state:', updatedVideos);
        }
        
        return updated;
      });

      // STEP 7: Show success message
      const uploadedPhotoCount = uploadedItems.filter(item => item.type === 'photo').length;
      const uploadedVideoCount = uploadedItems.filter(item => item.type === 'video').length;
      const uploadedDocCount = uploadedItems.filter(item => item.type === 'document').length;
      
      let successMessage = `Successfully uploaded ${uploadedItems.length} files to AWS S3`;
      if (uploadedPhotoCount > 0) successMessage += `\n- ${uploadedPhotoCount} photo${uploadedPhotoCount > 1 ? 's' : ''}`;
      if (uploadedVideoCount > 0) successMessage += `\n- ${uploadedVideoCount} video${uploadedVideoCount > 1 ? 's' : ''}`;
      if (uploadedDocCount > 0) successMessage += `\n- ${uploadedDocCount} document${uploadedDocCount > 1 ? 's' : ''}`;
      
      toast.success(successMessage, {
        id: 'media-upload',
        duration: 5000
      });
    } catch (error: any) {
      console.error('Error uploading media:', error);
      
      // Provide more helpful error messages
      let errorMessage = 'Failed to upload media';
      
      if (error.message) {
        errorMessage = error.message;
        
        // Add suggestions for common errors
        if (error.message.includes('timeout') || error.message.includes('network')) {
          errorMessage += '\nTry uploading smaller files or check your internet connection.';
        } else if (error.message.includes('permission') || error.message.includes('denied')) {
          errorMessage += '\nCheck if you have permission to upload to this property.';
        }
      }
      
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`, {
        id: 'media-upload',
        duration: 8000
      });
    } finally {
      setUploading(false);
    }
  };

  // Render upload section
  const renderUploadSection = (
    category: string,
    label: string,
    type: 'photo' | 'video' | 'document',
    icon: React.ReactNode,
    maxFiles: number = 5,
    accept: string = "image/*",
    description: string = "Add your files in any way you prefer"
  ) => {
    const files = mediaFiles.filter(file => file.category === category);
    const hasFiles = files.length > 0;
    const hasReachedLimit = files.length >= maxFiles;

    return (
      <section className="bg-white rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          {icon}
          {label}
        </h2>
        
        {/* Upload area */}
        <div 
          className={`border-2 border-dashed rounded-lg p-6 mb-4 ${hasReachedLimit ? 'bg-gray-100 border-gray-300' : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, category, type)}
        >
          <input 
            type="file" 
            id={`file-input-${category}`}
            ref={setFileInputRef(category)}
            className="hidden" 
            accept={accept}
            multiple={type !== 'video'} 
            onChange={(e) => handleFileSelect(category, type, e.target.files)}
          />
          
          <div className="text-center">
            {hasReachedLimit ? (
              <div className="text-gray-500">
                <p>Maximum number of files reached ({maxFiles})</p>
                <p className="mt-2">Remove some files to add more</p>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRefs.current[category]?.click()}
                  className="mb-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Browse Files
                </button>
                
                <p className="text-gray-500 text-sm">{description}</p>
                <p className="text-gray-400 text-xs mt-1">
                  {type === 'photo' && 'Supported formats: JPG, PNG, WEBP'}
                  {type === 'video' && 'Supported formats: MP4, MOV, AVI (max 100MB)'}
                  {type === 'document' && 'Supported formats: PDF, DOC, DOCX'}
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* File list */}
        {hasFiles && (
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">
                {files.length} {files.length === 1 ? 'file' : 'files'} selected
              </h3>
              <button
                type="button"
                onClick={() => removeAllFiles(category)}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Remove all
              </button>
            </div>
            
            <ul className="space-y-2">
              {files.map((file) => (
                <li key={file.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <div className="flex items-center gap-2">
                    {file.type === 'photo' && (
                      <img 
                        src={file.preview} 
                        alt="Preview" 
                        className="w-10 h-10 object-cover rounded"
                      />
                    )}
                    {file.type === 'video' && (
                      <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                        <Video className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    {file.type === 'document' && (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <FileText className="w-5 h-5 text-gray-600" />
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="text-sm truncate max-w-xs">
                        {file.file instanceof File ? file.file.name : 'Uploaded file'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {file.uploaded ? 'Uploaded' : 'Pending upload'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="space-y-6">
      {/* Upload sections */}
      <div className="space-y-6">
        {/* Photo upload sections */}
        {photoCategories.map(category => (
          <div key={category.id}>
            {renderUploadSection(
              category.id,
              category.label,
              'photo',
              <Upload className="w-5 h-5" />
            )}
          </div>
        ))}

        {/* Video upload section */}
        {renderUploadSection(
          'videoTour',
          'Property Video Tour (Optional)',
          'video',
          <Video className="w-5 h-5" />,
          1,
          'video/*',
          'Click to upload a video tour'
        )}

        {/* Document upload section */}
        {renderUploadSection(
          'documents',
          'Legal Documents',
          'document',
          <FileText className="w-5 h-5" />,
          10,
          '.pdf,.doc,.docx',
          'Click to upload legal documents'
        )}
      </div>

      {/* Upload button */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-semibold text-lg">Upload Files</h3>
            <p className="text-gray-500 text-sm">
              Upload all selected files to the server
            </p>
          </div>
          <button
            type="button"
            onClick={uploadMedia}
            disabled={uploading || mediaFiles.filter(f => !f.uploaded && f.file instanceof File).length === 0}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
              uploading || mediaFiles.filter(f => !f.uploaded && f.file instanceof File).length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyMediaUpload;
