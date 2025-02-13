import React, { useState, useRef } from 'react';
import { Upload, X, ChevronDown } from 'lucide-react';

interface PhotoDetails {
  id: string;
  file: File;
  preview: string;
  label: string;
}

const labelOptions = [
  'Entrance',
  'Reception',
  'Hall',
  'Meeting Room',
  'Cabin',
  'Staircase',
  'Elevator',
  'Floor Plan',
  'Outside View',
  'Others'
];

export default function PhotoUpload() {
  const [photos, setPhotos] = useState<PhotoDetails[]>([]);
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const newPhotos = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      label: 'Others'
    }));

    setPhotos(prev => [...prev, ...newPhotos]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = (id: string) => {
    setPhotos(prev => {
      const updatedPhotos = prev.filter(photo => photo.id !== id);
      // Revoke the URL to avoid memory leaks
      const photo = prev.find(p => p.id === id);
      if (photo) {
        URL.revokeObjectURL(photo.preview);
      }
      return updatedPhotos;
    });
  };

  const updatePhotoLabel = (id: string, newLabel: string) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === id ? { ...photo, label: newLabel } : photo
    ));
    setShowDropdown(null);
  };

  return (
    <div className="w-full max-w-3xl pl-4 sm:pl-6 md:pl-8">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Add Photos</h2>
      </div>

      {photos.length === 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-amber-700">
            <span className="text-2xl">⚠️</span>
            <p className="text-sm">Less photos added. Rank up your listing by adding more photos.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add Photo Button */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors"
        >
          <Upload className="h-6 w-6 text-gray-400" />
          <span className="text-sm font-medium text-gray-600">+ Add More</span>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        {/* Photo Previews */}
        {photos.map(photo => (
          <div key={photo.id} className="relative aspect-square group">
            <img
              src={photo.preview}
              alt={`Preview ${photo.id}`}
              className="w-full h-full object-cover rounded-lg"
            />
            
            {/* Remove Button */}
            <button
              onClick={() => removePhoto(photo.id)}
              className="absolute top-2 right-2 p-1 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              <X className="h-4 w-4 text-white" />
            </button>

            {/* Label Dropdown */}
            <div className="absolute bottom-2 left-2 right-2">
              <button
                onClick={() => setShowDropdown(showDropdown === photo.id ? null : photo.id)}
                className="w-full px-3 py-2 bg-black/50 hover:bg-black/70 rounded-lg text-white text-sm font-medium flex items-center justify-between transition-colors"
              >
                <span>{photo.label}</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {showDropdown === photo.id && (
                <div className="absolute bottom-full mb-1 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 py-1 max-h-48 overflow-y-auto">
                  {labelOptions.map(label => (
                    <button
                      key={label}
                      onClick={() => updatePhotoLabel(photo.id, label)}
                      className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 transition-colors"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}