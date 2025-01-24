import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Video } from 'lucide-react';

export interface PhotoData {
  [key: string]: string | File | null;
  coverImage: string | File | null;
  exteriorView: string | File | null;
  livingRoom: string | File | null;
  kitchen: string | File | null;
  diningRoom: string | File | null;
  bedroom1: string | File | null;
  bedroom2: string | File | null;
  bedroom3: string | File | null;
  bedroom4: string | File | null;
  bathroom1: string | File | null;
  bathroom2: string | File | null;
  bathroom3: string | File | null;
  bathroom4: string | File | null;
  balcony1: string | File | null;
  balcony2: string | File | null;
  balcony3: string | File | null;
  balcony4: string | File | null;
  studyRoom: string | File | null;
  pujaRoom: string | File | null;
  theaterRoom: string | File | null;
  gymRoom: string | File | null;
  utilityArea: string | File | null;
  others: string | File | null;
  propertyVideo: string | File | null;
}

interface PropertyPhotosProps {
  propertyId: string;
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

export function PropertyPhotos({ photoData, setPhotoData, featuresData, propertyId }: PropertyPhotosProps) {
  const [previewData, setPreviewData] = useState<{ url: string; title: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const uploadToS3 = async (fileName: string, base64Data: string, fileType: string, fieldName: string): Promise<string | null> => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:8000/api/photos/upload-photos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          propertyId,
          fileName,
          base64Data,
          fileType,
          fieldName,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload photos');
      }

      const data = await response.json();
      return data.fileUrl; // Ensure the backend returns the S3 URL
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange =
    (field: keyof PhotoData) =>
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        const maxSize = 2; // Default max size is 2MB
        if (file.size > maxSize * 1024 * 1024) {
          alert(`File size should not exceed ${maxSize}MB`);
          return;
        }

        try {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = async () => {
            const base64Data = reader.result as string;
            const url = await uploadToS3(file.name, base64Data, file.type, field as string);

            if (url) {
              setPhotoData((prev) => ({
                ...prev,
                [field]: url,
              }));
            } else {
              alert('Failed to upload file. Please try again.');
            }
          };

          reader.onerror = (error) => {
            console.error('Error reading file as Base64:', error);
          };
        } catch (error) {
          console.error('Error processing file:', error);
        }
      }
    };

  const handlePreview = (field: keyof PhotoData, label: string) => {
    const fileUrl = photoData[field];
    if (fileUrl) {
      setPreviewData({ url: fileUrl as string, title: label });
    } else {
      alert('Please upload an image first.');
    }
  };

  const closePreview = () => setPreviewData(null);

  const handleSaveProperty = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/empdashboard');
  };

  const dynamicFields = React.useMemo(() => {
    const fields: UploadField[] = [
      { id: 'coverImage', label: 'Cover Image', description: 'Main image for property listing', accept: 'image/jpeg,image/png', maxSize: 2, required: true },
      { id: 'exteriorView', label: 'Exterior View', description: 'Outside view of house / society', accept: 'image/jpeg,image/png', maxSize: 2 },
      { id: 'livingRoom', label: 'Living Room', description: 'Living area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
      { id: 'kitchen', label: 'Kitchen', description: 'Kitchen area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
      { id: 'diningRoom', label: 'Dining Room', description: 'Dining area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
      { id: 'utilityArea', label: 'Utility Area', description: 'Utility area of the house', accept: 'image/jpeg,image/png', maxSize: 2 },
      { id: 'others', label: 'Others', description: 'Any other house-related photos', accept: 'image/jpeg,image/png', maxSize: 2 },
      { id: 'propertyVideo', label: 'Property Video', description: 'Video of the entire property', accept: 'video/mp4', maxSize: 10 },
    ];

    for (let i = 1; i <= parseInt(featuresData?.bedrooms || '0', 10); i++) {
      fields.push({
        id: `bedroom${i}` as keyof PhotoData,
        label: `Bedroom ${i}`,
        description: `Photo of Bedroom ${i}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
      });
    }

    for (let i = 1; i <= parseInt(featuresData?.bathrooms || '0', 10); i++) {
      fields.push({
        id: `bathroom${i}` as keyof PhotoData,
        label: `Bathroom ${i}`,
        description: `Photo of Bathroom ${i}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
      });
    }

    for (let i = 1; i <= parseInt(featuresData?.balconies || '0', 10); i++) {
      fields.push({
        id: `balcony${i}` as keyof PhotoData,
        label: `Balcony ${i}`,
        description: `Photo of Balcony ${i}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
      });
    }

    featuresData?.extraRooms?.forEach((room, index) => {
      fields.push({
        id: `extraRoom${index + 1}` as keyof PhotoData,
        label: room,
        description: `Photo of ${room}`,
        accept: 'image/jpeg,image/png',
        maxSize: 2,
      });
    });

    return fields;
  }, [featuresData]);

  const uploadedPhotosCount = Object.values(photoData).filter((photo) => photo !== null).length;

  return (
    <div className="space-y-8">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
        </div>
      )}

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dynamicFields.map((field) => (
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
                    <span className="text-sm text-green-600">✓ Uploaded</span>
                    <button
                      onClick={() => handlePreview(field.id, field.label)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Preview
                    </button>
                    <button
                      onClick={() => setPhotoData((prev) => ({ ...prev, [field.id]: null }))}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Max size: {field.maxSize}MB | Formats: {field.accept.split('/')[1].split(',').map((f) => f.toUpperCase()).join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleSaveProperty}
        disabled={uploadedPhotosCount < 6}
        className={`px-6 py-3 rounded-lg transition-all ${uploadedPhotosCount >= 6 ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
      >
        Save Property
      </button>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">Success</h3>
            <p className="text-gray-700">Property submitted successfully!</p>
            <button
              onClick={closeSuccessModal}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {previewData && (
        <PreviewModal url={previewData.url} title={previewData.title} onClose={closePreview} />
      )}
    </div>
  );
}
