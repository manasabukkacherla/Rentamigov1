import { useState, useRef } from 'react';
import { Upload, Camera, Video, FileText, Clock, X } from 'lucide-react';
import CameraCaptureModal from './CameraCaptureModal';

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
        ],
        video: null,
        documents: []
    });

    const [dragActive, setDragActive] = useState(false);
    const imageInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
    const videoInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    const [cameraModalOpen, setCameraModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<string | null>(null);

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
    };

    const handleCameraCapture = (image: File) => {
        if (currentCategory) {
            const updatedImages = media.images.map(img => {
                if (img.category === currentCategory) {
                    return {
                        ...img,
                        files: [...img.files, { url: URL.createObjectURL(image), file: image }].slice(0, 5)
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
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            <div className="max-w-4xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-8">Media Upload</h1>
                <div className="space-y-8">
                    {/* Property Images */}
                    {media.images.map(({ category, files }) => (
                        <section key={category}>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                {imageCategoryLabels[category]}
                                <span className="text-sm font-normal text-gray-500">{files.length}/5 photos uploaded</span>
                            </h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="text-lg mb-4">Add your {imageCategoryLabels[category].toLowerCase()} in any way you prefer</p>
                                    <div className="flex gap-4 mb-4">
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                            onClick={() => handleImageClick(category)}
                                        >
                                            <Upload className="w-4 h-4" />
                                            Choose Files
                                        </button>
                                        {category !== 'floorPlan' && (
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
                                    <p className="text-sm text-gray-500">
                                        Or drag and drop your files here • Supported formats: JPG, PNG, WEBP (Max 5 photos)
                                    </p>
                                    <input
                                        type="file"
                                        ref={el => { imageInputRefs.current[category] = el }}
                                        onChange={(e) => handleImagesChange(e, category)}
                                        accept="image/*"
                                        multiple
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Image Preview Grid */}
                            {files.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
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
                        </section>
                    ))}

                    {/* Property Video Tour */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Video className="w-5 h-5" />
                            Property Video Tour (Optional)
                            <span className="text-sm font-normal text-gray-500">{media.video ? '1/1 video uploaded' : '0/1 video uploaded'}</span>
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
                            {!media.video ? (
                                <div className="flex flex-col items-center justify-center text-center">
                                    <Video className="w-12 h-12 text-gray-400 mb-4" />
                                    <p className="text-lg mb-4">Click to upload a video tour</p>
                                    <div className="flex gap-4 mb-4">
                                        <button
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                            onClick={handleVideoClick}
                                        >
                                            <Upload className="w-4 h-4" />
                                            Choose Video
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Supported formats: MP4, WEBM (Max 100MB)
                                    </p>
                                    <input
                                        type="file"
                                        ref={videoInputRef}
                                        onChange={handleVideoChange}
                                        accept="video/*"
                                        className="hidden"
                                    />
                                </div>
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
                    </section>

                    {/* Legal Documents */}
                    <section>
                        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Legal Documents
                        </h2>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 bg-white">
                            <div className="flex flex-col items-center justify-center text-center">
                                <FileText className="w-12 h-12 text-gray-400 mb-4" />
                                <p className="text-lg mb-4">Click to upload legal documents</p>
                                <div className="flex gap-4 mb-4">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                        onClick={handleDocumentClick}
                                    >
                                        <Upload className="w-4 h-4" />
                                        Choose Files
                                    </button>
                                </div>
                                <div className="text-sm text-gray-500 space-y-2">
                                    <p>Upload ownership proof, property tax documents, etc.</p>
                                    <p>Supported formats: PDF, DOC, DOCX</p>
                                </div>
                                <input
                                    type="file"
                                    ref={documentInputRef}
                                    onChange={handleDocumentChange}
                                    accept=".pdf,.doc,.docx"
                                    multiple
                                    className="hidden"
                                />
                            </div>
                        </div>

                        {/* Document List */}
                        {media.documents.length > 0 && (
                            <div className="space-y-3 mt-4">
                                {media.documents.map((doc, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <FileText size={20} className="text-gray-600" />
                                            <span className="text-gray-800">{doc.file.name}</span>
                                        </div>
                                        <button
                                            onClick={() => removeDocument(index)}
                                            className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                                        >
                                            <X size={16} className="text-gray-600" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Upload Guidelines */}
                    <section className="bg-gray-50 rounded-lg p-6">
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
                            <li className="flex items-start gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-2"></div>
                                <span>Supported document formats: PDF, DOC, DOCX</span>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>

            <CameraCaptureModal
                isOpen={cameraModalOpen}
                onClose={() => setCameraModalOpen(false)}
                onCapture={handleCameraCapture}
            />
        </div>
    );
};

export default CommercialMediaUpload;