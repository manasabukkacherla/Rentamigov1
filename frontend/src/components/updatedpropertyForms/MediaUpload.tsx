import { useState, useRef } from 'react';
import { ArrowRight, Image, Video, X, Upload, AlertCircle } from 'lucide-react';

interface MediaUploadProps {
  onMediaChange?: (media: {
    photos: { url: string; file: File }[];
    video?: { url: string; file: File };
  }) => void;
}

const MediaUpload = ({ onMediaChange }: MediaUploadProps) => {
  const [photos, setPhotos] = useState<{ url: string; file: File }[]>([]);
  const [video, setVideo] = useState<{ url: string; file: File } | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    photoInputRef.current?.click();
  };

  const handleVideoClick = () => {
    videoInputRef.current?.click();
  };

  const handlePhotoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    handlePhotoFiles(files);
  };

  const handlePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handlePhotoFiles(files);
    }
  };

  const handlePhotoFiles = (files: File[]) => {
    const newPhotos = files.map(file => ({
      url: URL.createObjectURL(file),
      file
    }));

    const updatedPhotos = [...photos, ...newPhotos].slice(0, 10); // Limit to 10 photos
    setPhotos(updatedPhotos);
    onMediaChange?.({ photos: updatedPhotos, video: video || undefined });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const videoUrl = URL.createObjectURL(file);
      const newVideo = { url: videoUrl, file };
      setVideo(newVideo);
      onMediaChange?.({ photos, video: newVideo });
    }
  };

  const removePhoto = (index: number) => {
    const updatedPhotos = photos.filter((_, i) => i !== index);
    setPhotos(updatedPhotos);
    onMediaChange?.({ photos: updatedPhotos, video: video || undefined });
  };

  const removeVideo = () => {
    setVideo(null);
    onMediaChange?.({ photos, video: undefined });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-2xl font-semibold">Property Media</h3>
        <ArrowRight className="opacity-40" size={20} />
        <span className="text-sm opacity-70">Upload Photos and Video</span>
      </div>

      <div className="space-y-8 max-w-4xl">
        {/* Photo Upload Section */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Image size={20} className="text-white/60" />
              Property Photos
            </h4>
            <span className="text-sm text-white/60">
              {photos.length}/10 photos uploaded
            </span>
          </div>

          {/* Drag & Drop Area */}
          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
              dragActive
                ? 'border-white bg-white/10'
                : 'border-white/20 hover:border-white/40'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handlePhotoDrop}
            onClick={handlePhotoClick}
          >
            <input
              type="file"
              ref={photoInputRef}
              onChange={handlePhotosChange}
              accept="image/*"
              multiple
              className="hidden"
            />
            <Upload size={32} className="mx-auto mb-4 text-white/40" />
            <p className="text-white/80">
              Drag and drop your photos here, or{' '}
              <span className="text-white underline cursor-pointer">browse</span>
            </p>
            <p className="text-sm text-white/60 mt-2">
              Supported formats: JPG, PNG, WEBP (Max 10 photos)
            </p>
          </div>

          {/* Photo Preview Grid */}
          {photos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={photo.url}
                    alt={`Property ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePhoto(index);
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

        {/* Video Upload Section */}
        <div className="bg-white/5 p-6 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-medium flex items-center gap-2">
              <Video size={20} className="text-white/60" />
              Property Video (Optional)
            </h4>
          </div>

          {!video ? (
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
              <p className="text-white/80">Click to upload a video</p>
              <p className="text-sm text-white/60 mt-2">
                Supported formats: MP4, WEBM (Max 100MB)
              </p>
            </button>
          ) : (
            <div className="relative rounded-lg overflow-hidden">
              <video
                src={video.url}
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

        {/* Guidelines */}
        <div className="bg-white/5 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertCircle size={20} className="text-white/60 mt-0.5" />
            <div className="text-sm text-white/60">
              <p className="font-medium text-white/80 mb-1">Upload Guidelines:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Upload clear, well-lit photos of your property</li>
                <li>Include photos of all major rooms and amenities</li>
                <li>Ensure photos are in landscape orientation for better viewing</li>
                <li>Video should be high quality and showcase the property well</li>
                <li>Maximum video size: 100MB</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;