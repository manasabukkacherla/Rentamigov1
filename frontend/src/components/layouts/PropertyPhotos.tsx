import React from 'react';
import { Image, Video } from 'lucide-react';

export interface PhotoData {
  [key: string]: File | null;
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
}

interface UploadField {
  id: keyof PhotoData;
  label: string;
  description: string;
  accept: string;
  maxSize: number;
}

const UPLOAD_FIELDS: UploadField[] = [
  { id: 'exteriorView', label: 'Exterior View', description: 'Outside view of house / society', accept: 'image/jpeg', maxSize: 2 },
  { id: 'livingRoom', label: 'Living Room', description: 'Living area of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'kitchen', label: 'Kitchen', description: 'Kitchen area of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'diningRoom', label: 'Dining Room', description: 'Dining area of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bedroom1', label: 'Bedroom 1', description: 'Master bedroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bedroom2', label: 'Bedroom 2', description: 'Kids bedroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bedroom3', label: 'Bedroom 3', description: 'Guest bedroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bedroom4', label: 'Bedroom 4', description: 'Guest bedroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bathroom1', label: 'Bathroom 1', description: 'Attached bathroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bathroom2', label: 'Bathroom 2', description: 'Attached bathroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bathroom3', label: 'Bathroom 3', description: 'Common bathroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'bathroom4', label: 'Bathroom 4', description: 'Common bathroom of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'balcony1', label: 'Balcony 1', description: 'Attached balcony of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'balcony2', label: 'Balcony 2', description: 'Attached balcony of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'balcony3', label: 'Balcony 3', description: 'Extra balcony', accept: 'image/jpeg', maxSize: 2 },
  { id: 'balcony4', label: 'Balcony 4', description: 'Extra balcony', accept: 'image/jpeg', maxSize: 2 },
  { id: 'studyRoom', label: 'Study Room', description: 'Study room of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'pujaRoom', label: 'Puja Room', description: 'Puja room of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'theaterRoom', label: 'Theater Room', description: 'Theater room of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'gymRoom', label: 'Gym Room', description: 'Gym room of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'utilityArea', label: 'Utility Area', description: 'Utility area of the house', accept: 'image/jpeg', maxSize: 2 },
  { id: 'others', label: 'Others', description: 'Any other house related photos', accept: 'image/jpeg', maxSize: 2 },
  { id: 'propertyVideo', label: 'Property Video', description: 'Video of the entire property', accept: 'video/mp4', maxSize: 3 },
];

export function PropertyPhotos({ photoData, setPhotoData }: PropertyPhotosProps) {
  const handleFileChange = (field: keyof PhotoData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      const maxSize = UPLOAD_FIELDS.find(f => f.id === field)?.maxSize || 2;
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size should not exceed ${maxSize}MB`);
        return;
      }
    }
    setPhotoData(prev => ({ ...prev, [field]: file }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {UPLOAD_FIELDS.map(field => (
          <div key={field.id} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              {field.accept.includes('image') ? <Image className="w-4 h-4" /> : <Video className="w-4 h-4" />}
              {field.label}
            </label>
            <p className="text-sm text-gray-500">{field.description}</p>
            <div className="relative">
              <input
                type="file"
                accept={field.accept}
                onChange={handleFileChange(field.id)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              {photoData[field.id] && (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-sm text-green-600">✓ {photoData[field.id]?.name}</span>
                  <button
                    onClick={() => setPhotoData(prev => ({ ...prev, [field.id]: null }))}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">Max size: {field.maxSize}MB, Format: {field.accept.split('/')[1].toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}