import React, { useState, useRef, DragEvent } from 'react';
import { Upload, Camera, Video, FileText, Clock, X } from 'lucide-react';
import CameraCaptureModal from './CameraCaptureModal';

interface MediaUploadProps {
  onMediaChange?: (media: {
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
  }) => void;
  initialMedia: {
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
  };
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaChange, initialMedia }) => {
  const [media, setMedia] = useState(initialMedia);

  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<keyof typeof media.photos | null>(null);

  const fileInputRefs = {
    exterior: useRef<HTMLInputElement>(null),
    interior: useRef<HTMLInputElement>(null),
    floorPlan: useRef<HTMLInputElement>(null),
    washrooms: useRef<HTMLInputElement>(null),
    lifts: useRef<HTMLInputElement>(null),
    emergencyExits: useRef<HTMLInputElement>(null),
    bedrooms: useRef<HTMLInputElement>(null),
    halls: useRef<HTMLInputElement>(null),
    storerooms: useRef<HTMLInputElement>(null),
    kitchen: useRef<HTMLInputElement>(null),
    videoTour: useRef<HTMLInputElement>(null),
    documents: useRef<HTMLInputElement>(null),
  };

  const handleFileSelect = (category: keyof typeof media.photos | 'videoTour' | 'documents', files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    let updatedFiles: (File | string)[] = [];

    if (category === 'videoTour') {
      if (files[0].size > 100 * 1024 * 1024) { // 100MB limit
        alert('Video file size must be less than 100MB');
        return;
      }
      if (!files[0].type.startsWith('video/')) {
        alert('Please upload a valid video file');
        return;
      }
      const updatedMedia = { ...media, videoTour: files[0] };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    } else if (category === 'documents') {
      const validFiles = newFiles.filter(file => 
        file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      if (validFiles.length !== newFiles.length) {
        alert('Please upload valid document files (PDF, DOC, DOCX)');
        return;
      }
      updatedFiles = [...media.documents, ...validFiles];
      const updatedMedia = { ...media, documents: updatedFiles };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    } else {
      const validFiles = newFiles.filter(file => 
        file.type.startsWith('image/') && 
        file.size <= 5 * 1024 * 1024 // 5MB limit
      );
      if (validFiles.length !== newFiles.length) {
        alert('Please upload valid image files (JPG, PNG, WEBP) under 5MB');
        return;
      }
      updatedFiles = [...media.photos[category], ...validFiles].slice(0, 5); // Max 5 photos
      const updatedMedia = {
        ...media,
        photos: {
          ...media.photos,
          [category]: updatedFiles
        }
      };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, category: keyof typeof media.photos | 'videoTour' | 'documents') => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(category, e.dataTransfer.files);
  };

  const removeFile = (category: keyof typeof media.photos | 'videoTour' | 'documents', index: number) => {
    if (category === 'videoTour') {
      const updatedMedia = { ...media, videoTour: undefined };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    } else if (category === 'documents') {
      const updatedFiles = [...media.documents];
      updatedFiles.splice(index, 1);
      const updatedMedia = { ...media, documents: updatedFiles };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    } else {
      const updatedFiles = [...media.photos[category]];
      updatedFiles.splice(index, 1);
      const updatedMedia = {
        ...media,
        photos: {
          ...media.photos,
          [category]: updatedFiles
        }
      };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    }
  };

  const removeAllFiles = (category: keyof typeof media.photos | 'documents') => {
    if (category === 'documents') {
      const updatedMedia = {
        ...media,
        documents: []
      };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    } else {
      const updatedMedia = {
        ...media,
        photos: {
          ...media.photos,
          [category]: []
        }
      };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    }
  };

  const handleCameraCapture = (image: File) => {
    if (currentCategory) {
      const currentFiles = media.photos[currentCategory];
      const updatedFiles = [...currentFiles, image].slice(0, 5);
      const updatedMedia = {
        ...media,
        photos: {
          ...media.photos,
          [currentCategory]: updatedFiles
        }
      };
      setMedia(updatedMedia);
      onMediaChange?.(updatedMedia);
    }
  };

  const renderUploadSection = (
    title: string,
    category: keyof typeof media.photos | 'videoTour' | 'documents',
    icon: React.ReactNode,
    maxFiles: number = 5,
    accept: string = "image/*",
    description: string = "Add your photos in any way you prefer"
  ) => (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        {icon}
        {title}
        <span className="text-sm font-normal text-gray-500">
          {category === 'videoTour' 
            ? (media.videoTour ? '1/1' : '0/1') 
            : category === 'documents'
              ? `${media.documents.length}/10`
              : `${media.photos[category as keyof typeof media.photos].length}/${maxFiles}`} {category === 'videoTour' ? 'video' : 'photos'} uploaded
        </span>
      </h2>
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, category)}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg mb-4">{description}</p>
          <div className="flex gap-4 mb-4">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => fileInputRefs[category as keyof typeof fileInputRefs].current?.click()}
            >
              <Upload className="w-4 h-4" />
              Choose Files
            </button>
            {category !== 'floorPlan' && category !== 'documents' && category !== 'videoTour' && (
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={() => {
                  setCurrentCategory(category as keyof typeof media.photos);
                  setCameraModalOpen(true);
                }}
              >
                <Camera className="w-4 h-4" />
                Take Photo
              </button>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRefs[category as keyof typeof fileInputRefs]}
            className="hidden"
            accept={accept}
            multiple={category !== 'videoTour'}
            onChange={(e) => handleFileSelect(category, e.target.files)}
          />
          <p className="text-sm text-gray-500">
            Or drag and drop your files here • Supported formats: {accept}
          </p>
        </div>
      </div>
      {category === 'videoTour' ? (
        media.videoTour && (
          <div className="relative group mt-4">
            <video
              src={typeof media.videoTour === 'string' ? media.videoTour : URL.createObjectURL(media.videoTour)}
              className="w-full h-32 object-cover rounded-lg"
              controls
            />
            <button
              onClick={() => removeFile('videoTour', 0)}
              className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      ) : category === 'documents' ? (
        media.documents.length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Uploaded Documents</h3>
              <button
                onClick={() => removeAllFiles('documents')}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-black/10 text-black rounded-md hover:bg-black/20 transition-colors"
              >
                Clear All
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.documents.map((file, index) => (
                <div key={index} className="relative group">
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                    <span className="text-sm text-gray-600 mt-2 break-all px-2">
                      {typeof file === 'string' ? file.split('/').pop() : file.name}
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile('documents', index)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        media.photos[category as keyof typeof media.photos].length > 0 && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">Uploaded Images</h3>
              <button
                onClick={() => removeAllFiles(category as keyof typeof media.photos)}
                className="flex items-center gap-1 px-3 py-1 text-sm bg-black/10 text-black rounded-md hover:bg-black/20 transition-colors"
              >
                Clear All
                <X size={14} />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {media.photos[category as keyof typeof media.photos].map((file, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img
                    src={typeof file === 'string' ? file : URL.createObjectURL(file)}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(category as keyof typeof media.photos, index);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </section>
  );

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-black">Property Media</h2>
      <div className="space-y-8">
        {renderUploadSection('Exterior Views', 'exterior', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Interior Views', 'interior', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Floor Plan', 'floorPlan', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Washrooms', 'washrooms', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Lifts', 'lifts', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Emergency Exits', 'emergencyExits', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Bedrooms', 'bedrooms', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Halls', 'halls', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Storerooms', 'storerooms', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Kitchen', 'kitchen', <Upload className="w-5 h-5" />)}
        {renderUploadSection(
          'Property Video Tour (Optional)',
          'videoTour',
          <Video className="w-5 h-5" />,
          1,
          'video/*',
          'Click to upload a video tour'
        )}
        {renderUploadSection(
          'Legal Documents',
          'documents',
          <FileText className="w-5 h-5" />,
          10,
          '.pdf,.doc,.docx',
          'Click to upload legal documents'
        )}

        <section className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Upload Guidelines:
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
              <span>Upload clear, high-resolution images for each category</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
              <span>Ensure proper lighting and angles in all photos</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
              <span>Video tour should showcase the property comprehensively</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
              <span>Maximum video size: 100MB</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
              <span>Legal documents should be clear and complete</span>
            </li>
          </ul>
        </section>
      </div>

      <CameraCaptureModal
        isOpen={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        onCapture={handleCameraCapture}
      />
    </div>
  );
};

export default MediaUpload;