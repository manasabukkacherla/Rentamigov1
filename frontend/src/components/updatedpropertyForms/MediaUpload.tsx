import React, { useState, useRef, DragEvent } from 'react';
import { Upload, Camera, Video, FileText, Clock, X } from 'lucide-react';
import CameraCaptureModal from './CameraCaptureModal';

interface MediaUploadProps {
  onMediaChange?: (media: {
    exteriorViews: File[];
    interiorViews: File[];
    floorPlan: File[];
    washrooms: File[];
    lifts: File[];
    emergencyExits: File[];
    videoTour?: File;
    legalDocuments: File[];
  }) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaChange }) => {
  const [media, setMedia] = useState({
    exteriorViews: [] as File[],
    interiorViews: [] as File[],
    floorPlan: [] as File[],
    washrooms: [] as File[],
    lifts: [] as File[],
    emergencyExits: [] as File[],
    videoTour: undefined as File | undefined,
    legalDocuments: [] as File[],
  });

  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<keyof typeof media | null>(null);

  const fileInputRefs = {
    exteriorViews: useRef<HTMLInputElement>(null),
    interiorViews: useRef<HTMLInputElement>(null),
    floorPlan: useRef<HTMLInputElement>(null),
    washrooms: useRef<HTMLInputElement>(null),
    lifts: useRef<HTMLInputElement>(null),
    emergencyExits: useRef<HTMLInputElement>(null),
    videoTour: useRef<HTMLInputElement>(null),
    legalDocuments: useRef<HTMLInputElement>(null),
  };

  const handleFileSelect = (category: keyof typeof media, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    let updatedFiles: File[] = [];

    if (category === 'videoTour') {
      if (files[0].size > 100 * 1024 * 1024) { // 100MB limit
        alert('Video file size must be less than 100MB');
        return;
      }
      if (!files[0].type.startsWith('video/')) {
        alert('Please upload a valid video file');
        return;
      }
      setMedia(prev => ({ ...prev, videoTour: files[0] }));
    } else if (category === 'legalDocuments') {
      const validFiles = newFiles.filter(file => 
        file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );
      if (validFiles.length !== newFiles.length) {
        alert('Please upload valid document files (PDF, DOC, DOCX)');
        return;
      }
      updatedFiles = [...media[category], ...validFiles];
    } else {
      const validFiles = newFiles.filter(file => 
        file.type.startsWith('image/') && 
        file.size <= 5 * 1024 * 1024 // 5MB limit
      );
      if (validFiles.length !== newFiles.length) {
        alert('Please upload valid image files (JPG, PNG, WEBP) under 5MB');
        return;
      }
      updatedFiles = [...media[category], ...validFiles].slice(0, 5); // Max 5 photos
    }

    setMedia(prev => ({ ...prev, [category]: updatedFiles }));
    onMediaChange?.({
      ...media,
      [category]: updatedFiles,
    });
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, category: keyof typeof media) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(category, e.dataTransfer.files);
  };
  const removeFile = (category: keyof typeof media, index: number) => {
    const currentFiles = media[category];
    let updatedFiles: File[] = [];
    
    if (Array.isArray(currentFiles)) {
      updatedFiles = [...currentFiles];
      updatedFiles.splice(index, 1);
    } else if (currentFiles) {
      // Handle single file case (like videoTour)
      updatedFiles = [];
    }

    setMedia(prev => ({ ...prev, [category]: updatedFiles }));
    onMediaChange?.({
      ...media,
      [category]: updatedFiles,
    });
  };

  const handleCameraCapture = (image: File) => {
    if (currentCategory) {
      const currentFiles = media[currentCategory];
      let updatedFiles: File[] = [];
      
      if (Array.isArray(currentFiles)) {
        updatedFiles = [...currentFiles, image].slice(0, 5);
      } else if (currentFiles) {
        updatedFiles = [image];
      }

      setMedia(prev => ({ ...prev, [currentCategory]: updatedFiles }));
      onMediaChange?.({
        ...media,
        [currentCategory]: updatedFiles,
      });
    }
  };

  const renderUploadSection = (
    title: string,
    category: keyof typeof media,
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
          {Array.isArray(media[category]) ? media[category].length : 0}/{maxFiles} {category === 'videoTour' ? 'video' : 'photos'} uploaded
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
              onClick={() => fileInputRefs[category].current?.click()}
            >
              <Upload className="w-4 h-4" />
              Choose Files
            </button>
            {category !== 'floorPlan' && category !== 'legalDocuments' && (
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={() => {
                  setCurrentCategory(category);
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
            ref={fileInputRefs[category]}
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
      {Array.isArray(media[category]) ? (
        media[category].length > 0 && (
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media[category].map((file, index) => (
              <div key={index} className="relative group">
                {file.type.startsWith('image/') ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`${title} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-400" />
                  </div>
                )}
                  <button
                  onClick={() => removeFile(category, index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                  <X className="w-4 h-4" />
                  </button>
            </div>
            ))}
          </div>
          ) ): (
            media[category] && (
              <div className="relative group">
                <video
                  src={URL.createObjectURL(media[category] as File)}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setMedia(prev => ({ ...prev, videoTour: undefined }))}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
                </div>
            )
          )}
        {/* </div> */}
      {/* // </div>   */}
    </section>
  );

  return (
    <div className="bg-gray-100 rounded-xl p-8 shadow-md border border-black/20 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-6 text-black">Property Media</h2>
      <div className="space-y-8">
        {renderUploadSection('Exterior Views', 'exteriorViews', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Interior Views', 'interiorViews', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Floor Plan', 'floorPlan', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Washrooms', 'washrooms', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Lifts', 'lifts', <Upload className="w-5 h-5" />)}
        {renderUploadSection('Emergency Exits', 'emergencyExits', <Upload className="w-5 h-5" />)}
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
          'legalDocuments',
          <FileText className="w-5 h-5" />,
          10,
          '.pdf,.doc,.docx',
          'Click to upload legal documents'
        )}

      {/* Upload Guidelines */}
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