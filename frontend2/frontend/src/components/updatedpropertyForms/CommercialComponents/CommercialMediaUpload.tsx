import { useState, useRef } from 'react';
import { ArrowRight, Image, Video, FileText, Upload, X, AlertCircle } from 'lucide-react';

interface CommercialMediaUploadProps {
  onMediaChange?: (media: {
    images: { category: string; files: { url: string; file: File }[] }[];
    video?: { url: string; file: File };
    documents: { type: string; file: File }[];
  }) => void;
}

const CommercialMediaUpload = ({ onMediaChange }: CommercialMediaUploadProps) => {
  const [media, setMedia] = useState<{
    images: { category: string; files: { url: string; file: File }[] }[];
    video: { url: string; file: File } | null;
    documents: { type: string; file: File }[];
  }>({
    images: [
      { category: 'exterior', files: [] },
      { category: 'interior', files: [] },
      { category: 'floorPlan', files: [] },
      { category: 'washrooms', files: [] },
      { category: 'lifts', files: [] },
      { category: 'emergencyExits', files: [] }
    ],
    video: null,
    documents: []
  });

  const [dragActive, setDragActive] = useState(false);
  const imageInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const videoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = (category: string) => {
    imageInputRefs.current[category]?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handleDocumentClick = () => {
    documentInputRef.current?.click();
  };

  const handleImageDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    handleImageFiles(files, category);
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleImageFiles(files, category);
    }
  };

  const handleImageFiles = (files: File[], category: string) => {
    const newFiles = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));

    const updatedImages = media.images.map(img => {
      if (img.category === category) {
        return {
          ...img,
          files: [...img.files, ...newFiles].slice(0, 5) // Limit to 5 images per category
        };
      }
      return img;
    });

    const updatedMedia = { ...media, images: updatedImages };
    setMedia(updatedMedia);
    onMediaChange?.({
      images: updatedMedia.images,
      video: updatedMedia.video || undefined,
      documents: updatedMedia.documents
    });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      const newVideo = { url: videoUrl, file };
      
      const updatedMedia = { ...media, video: newVideo };
      setMedia(updatedMedia);
      onMediaChange?.({
        images: updatedMedia.images,
        video: newVideo,
        documents: updatedMedia.documents
      });
    }
  };

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newDocuments = files.map(file => ({
        type: file.name.split('.').pop()?.toLowerCase() || 'unknown',
        file
      }));

      const updatedMedia = {
        ...media,
        documents: [...media.documents, ...newDocuments]
      };
      setMedia(updatedMedia);
      onMediaChange?.({
        images: updatedMedia.images,
        video: updatedMedia.video || undefined,
        documents: updatedMedia.documents
      });
    }
  };

  const removeImage = (category: string, index: number) => {
    const updatedImages = media.images.map(img => {
      if (img.category === category) {
        return {
          ...img,
          files: img.files.filter((_, i) => i !== index)
        };
      }
      return img;
    });

    const updatedMedia = { ...media, images: updatedImages };
    setMedia(updatedMedia);
    onMediaChange?.({
      images: updatedMedia.images,
      video: updatedMedia.video || undefined,
      documents: updatedMedia.documents
    });
  };

  const removeVideo = () => {
    const updatedMedia = { ...media, video: null };
    setMedia(updatedMedia);
    onMediaChange?.({
      images: updatedMedia.images,
      video: undefined,
      documents: updatedMedia.documents
    });
  };

  const removeDocument = (index: number) => {
    const updatedDocuments = media.documents.filter((_, i) => i !== index);
    const updatedMedia = { ...media, documents: updatedDocuments };
    setMedia(updatedMedia);
    onMediaChange?.({
      images: updatedMedia.images,
      video: updatedMedia.video || undefined,
      documents: updatedDocuments
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const imageCategoryLabels: { [key: string]: string } = {
    exterior: 'Exterior Views',
    interior: 'Interior Views',
    floorPlan: 'Floor Plan',
    washrooms: 'Washrooms',
    lifts: 'Lifts',
    emergencyExits: 'Emergency Exits'
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Media Upload</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Upload Property Media</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Property Images */}
        {media.images.map(({ category, files }) => (
          <div key={category} className="bg-white/5 p-6 rounded-lg space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium flex items-center gap-2">
                <Image size={20} className="text-white/60" />
                {imageCategoryLabels[category]}
              </h4>
              <span className="text-sm text-white/60">
                {files.length}/5 photos uploaded
              </span>
            </div>

            {/* Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                dragActive
                  ? 'border-white bg-white/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
              onDragEnter={(e) => handleDrag(e)}
              onDragLeave={(e) => handleDrag(e)}
              onDragOver={(e) => handleDrag(e)}
              onDrop={(e) => handleImageDrop(e, category)}
              onClick={() => handleImageClick(category)}
            >
              <input
                type="file"
                ref={el => imageInputRefs.current[category] = el}
                onChange={(e) => handleImagesChange(e, category)}
                accept="image/*"
                multiple
                className="hidden"
              />
              <Upload size={32} className="mx-auto mb-4 text-white/40" />
              <p className="text-white/80">
                Drag and drop your {category} photos here, or{' '}
                <span className="text-white underline cursor-pointer">browse</span>
              </p>
              <p className="text-sm text-white/60 mt-2">
                Supported formats: JPG, PNG, WEBP (Max 5 photos)
              </p>
            </div>

            {/* Image Preview Grid */}
            {files.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden group"
                  >
                    <img
                      src={file.url}
                      alt={`${category} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(category, index);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Video Upload */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Video size={20} className="text-white/60" />
              Property Video Tour (Optional)
            </h4>
          </div>

          {!media.video ? (
            <button
              onClick={handleVideoClick}
              className="w-full border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors duration-200"
            >
              <input
                type="file"
                ref={videoInputRef}
                onChange={handleVideoChange}
                accept="video/*"
                className="hidden"
              />
              <Upload size={32} className="mx-auto mb-4 text-white/40" />
              <p className="text-white/80">Click to upload a video tour</p>
              <p className="text-sm text-white/60 mt-2">
                Supported formats: MP4, WEBM (Max 100MB)
              </p>
            </button>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={media.video.url}
                controls
                className="w-full aspect-video bg-black"
              />
              <button
                onClick={removeVideo}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
              >
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Legal Documents */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <FileText size={20} className="text-white/60" />
              Legal Documents
            </h4>
          </div>

          <button
            onClick={handleDocumentClick}
            className="w-full border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-white/40 transition-colors duration-200"
          >
            <input
              type="file"
              ref={documentInputRef}
              onChange={handleDocumentChange}
              accept=".pdf,.doc,.docx"
              multiple
              className="hidden"
            />
            <Upload size={32} className="mx-auto mb-4 text-white/40" />
            <p className="text-white/80">Click to upload legal documents</p>
            <p className="text-sm text-white/60 mt-2">
              Upload ownership proof, property tax documents, etc.
              <br />
              Supported formats: PDF, DOC, DOCX
            </p>
          </button>

          {/* Document List */}
          {media.documents.length > 0 && (
            <div className="space-y-3">
              {media.documents.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-white/60" />
                    <span className="text-white/80">{doc.file.name}</span>
                  </div>
                  <button
                    onClick={() => removeDocument(index)}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors duration-200"
                  >
                    <X size={16} className="text-white/60" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Guidelines */}
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-white/60 mt-0.5" />
            <div className="text-sm text-white/60">
              <p className="font-medium text-white/80 mb-1">Upload Guidelines:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Upload clear, high-resolution images for each category</li>
                <li>Ensure proper lighting and angles in all photos</li>
                <li>Video tour should showcase the property comprehensively</li>
                <li>Maximum video size: 100MB</li>
                <li>Legal documents should be clear and complete</li>
                <li>Supported document formats: PDF, DOC, DOCX</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialMediaUpload;