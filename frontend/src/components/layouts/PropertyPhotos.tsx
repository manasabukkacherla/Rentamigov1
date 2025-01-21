import React, { useState } from 'react';
import { Image, Video, Eye } from 'lucide-react';

export interface PhotoData {
  [key: string]: File | null;
  coverImage: File | null;
  exteriorView: File | null;
  livingRoom: File | null;
  kitchen: File | null;
  diningRoom: File | null;
  bedroom1: File | null;
  bedroom2: File | null;
  bedroom3: File | null;
  bedroom4: File | null;
  bathroom1: File | null;
  bathroom2: File | null;
  bathroom3: File | null;
  bathroom4: File | null;
  balcony1: File | null;
  balcony2: File | null;
  balcony3: File | null;
  balcony4: File | null;
  studyRoom: File | null;
  pujaRoom: File | null;
  theaterRoom: File | null;
  gymRoom: File | null;
  utilityArea: File | null;
  others: File | null;
  propertyVideo: File | null;
}

interface PropertyPhotosProps {
  photoData: PhotoData;
  setPhotoData: React.Dispatch<React.SetStateAction<PhotoData>>;
  featuresData?: {
    bedrooms: string;
    bathrooms: string;
    balconies: string;
    extraRooms: string[];
  };
}

interface UploadField {
  id: keyof PhotoData;
  label: string;
  description: string;
  accept: string;
  maxSize: number;
  category?: 'bedroom' | 'bathroom' | 'balcony' | 'extraRoom';
  required?: boolean;
}

interface PreviewModalProps {
  url: string;
  title: string;
  onClose: () => void;
}

const PreviewModal = ({ url, title, onClose }: PreviewModalProps) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-4xl w-full mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="p-4">
        {url.endsWith('.mp4') ? (
          <video
            src={url}
            controls
            className="w-full h-auto rounded-lg"
          >
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={url}
            alt={title}
            className="w-full h-auto rounded-lg"
          />
        )}
      </div>
    </div>
  </div>
);

const BASE_UPLOAD_FIELDS: UploadField[] = [
  { id: 'coverImage', label: 'Cover Image', description: 'Main image for property listing', accept: 'image/jpeg,image/png', maxSize: 2, required: true },
  { id: 'exteriorView', label: 'Exterior View', description: 'Outside view of house / society', accept: 'image/jpeg,image/png', maxSize: 2 },
  { id: 'livingRoom', label: 'Living Room', description: 'Living area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
  { id: 'kitchen', label: 'Kitchen', description: 'Kitchen area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
  { id: 'diningRoom', label: 'Dining Room', description: 'Dining area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
  { id: 'utilityArea', label: 'Utility Area', description: 'Utility area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
  { id: 'others', label: 'Others', description: 'Any other house related photos', accept: 'image/jpeg,image/png', maxSize: 2 },
  { id: 'propertyVideo', label: 'Property Video', description: 'Video of the entire property', accept: 'video/mp4', maxSize: 10 },
];

export function PropertyPhotos({ photoData, setPhotoData, featuresData }: PropertyPhotosProps) {
  const [previewData, setPreviewData] = useState<{ url: string; title: string } | null>(null);

  const handleFileChange = (field: keyof PhotoData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const maxSize = BASE_UPLOAD_FIELDS.find(f => f.id === field)?.maxSize || 2;
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return;
      }
    }
    setPhotoData(prev => ({ ...prev, [field]: file }));
  };

  const handlePreview = (field: keyof PhotoData, label: string) => {
    const file = photoData[field];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewData({ url, title: label });
    } else {
      alert('Please upload an image first');
    }
  };

  const closePreview = () => {
    if (previewData) {
      URL.revokeObjectURL(previewData.url);
      setPreviewData(null);
    }
  };

  // Generate dynamic upload fields based on features
  const getDynamicUploadFields = () => {
    const dynamicFields: UploadField[] = [...BASE_UPLOAD_FIELDS];

    // Add bedroom fields
    const bedroomCount = parseInt(featuresData?.bedrooms || '0');
    for (let i = 1; i <= bedroomCount && i <= 10; i++) {
      dynamicFields.push({
        id: `bedroom${i}` as keyof PhotoData,
        label: `Bedroom ${i}`,
        description: i === 1 ? 'Master bedroom' : `Bedroom ${i}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
        category: 'bedroom'
      });
    }

    // Add bathroom fields
    const bathroomCount = parseInt(featuresData?.bathrooms || '0');
    for (let i = 1; i <= bathroomCount && i <= 10; i++) {
      dynamicFields.push({
        id: `bathroom${i}` as keyof PhotoData,
        label: `Bathroom ${i}`,
        description: `Bathroom ${i}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
        category: 'bathroom'
      });
    }

    // Add balcony fields
    const balconyCount = parseInt(featuresData?.balconies || '0');
    for (let i = 1; i <= balconyCount && i <= 10; i++) {
      dynamicFields.push({
        id: `balcony${i}` as keyof PhotoData,
        label: `Balcony ${i}`,
        description: `Balcony ${i}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
        category: 'balcony'
      });
    }

    // Add extra room fields
    featuresData?.extraRooms?.forEach(room => {
      const fieldId = room.toLowerCase().replace(/\s+/g, '') as keyof PhotoData;
      dynamicFields.push({
        id: fieldId,
        label: room,
        description: `${room} photos`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
        category: 'extraRoom'
      });
    });

    return dynamicFields;
  };

  const uploadFields = getDynamicUploadFields();

  // Group fields by category for better organization
  const groupedFields = uploadFields.reduce((acc, field) => {
    const category = field.category || 'main';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(field);
    return acc;
  }, {} as Record<string, UploadField[]>);

  return (
    <div className="space-y-8">
      {/* Main Fields */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {groupedFields.main?.map(field => (
            <div key={field.id} className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                {field.accept.includes('image') ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {field.label}
                {field.required && <span className="text-red-500">*</span>}
              </label>
              <p className="text-sm text-gray-500">{field.description}</p>
              <div className="relative">
                <input
                  type="file"
                  accept={field.accept}
                  onChange={handleFileChange(field.id)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                />
                {photoData[field.id] && (
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-green-600">✓ {photoData[field.id]?.name}</span>
                    <button
                      onClick={() => handlePreview(field.id, field.label)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setPhotoData(prev => ({ ...prev, [field.id]: null }))}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Max size: {field.maxSize}MB
                Format: {field.accept.split('/')[1].split(',').map(f => f.toUpperCase()).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bedrooms Section */}
      {groupedFields.bedroom && groupedFields.bedroom.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bedrooms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedFields.bedroom.map(field => (
              <div key={field.id} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4" />
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept={field.accept}
                    onChange={handleFileChange(field.id)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                  {photoData[field.id] && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-green-600">✓ {photoData[field.id]?.name}</span>
                      <button
                        onClick={() => handlePreview(field.id, field.label)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setPhotoData(prev => ({ ...prev, [field.id]: null }))}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bathrooms Section */}
      {groupedFields.bathroom && groupedFields.bathroom.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Bathrooms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedFields.bathroom.map(field => (
              <div key={field.id} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4" />
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept={field.accept}
                    onChange={handleFileChange(field.id)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                  {photoData[field.id] && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-green-600">✓ {photoData[field.id]?.name}</span>
                      <button
                        onClick={() => handlePreview(field.id, field.label)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setPhotoData(prev => ({ ...prev, [field.id]: null }))}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Balconies Section */}
      {groupedFields.balcony && groupedFields.balcony.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Balconies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedFields.balcony.map(field => (
              <div key={field.id} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4" />
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept={field.accept}
                    onChange={handleFileChange(field.id)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                  {photoData[field.id] && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-green-600">✓ {photoData[field.id]?.name}</span>
                      <button
                        onClick={() => handlePreview(field.id, field.label)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setPhotoData(prev => ({ ...prev, [field.id]: null }))}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Extra Rooms Section */}
      {groupedFields.extraRoom && groupedFields.extraRoom.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Extra Rooms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {groupedFields.extraRoom.map(field => (
              <div key={field.id} className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Image className="w-4 h-4" />
                  {field.label}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept={field.accept}
                    onChange={handleFileChange(field.id)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  />
                  {photoData[field.id] && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm text-green-600">✓ {photoData[field.id]?.name}</span>
                      <button
                        onClick={() => handlePreview(field.id, field.label)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        Preview
                      </button>
                      <button
                        onClick={() => setPhotoData(prev => ({ ...prev, [field.id]: null }))}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewData && (
        <PreviewModal
          url={previewData.url}
          title={previewData.title}
          onClose={closePreview}
        />
      )}
    </div>
  );
}