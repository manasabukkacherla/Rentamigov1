import React, { useState, useRef, ChangeEvent } from 'react';
import { Image as ImageIcon, Video, X, Upload, Camera, AlertCircle, Tag } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  file: File;
  preview: string;
  title: string;
  tags: string[];
}

const PgMedia = () => {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [batchTitle, setBatchTitle] = useState('');
  const [selectedType, setSelectedType] = useState<'photo' | 'video'>('photo');
  const [error, setError] = useState('');
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultPhotoTags = ['Exterior', 'Interior', 'Room', 'Bathroom', 'Kitchen', 'Common Area'];
  const defaultVideoTags = ['Room Tour', 'Facility Tour', 'Amenities', 'Overview'];

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setError('');
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    if (!batchTitle) {
      setError('Please enter a title for the batch');
      return;
    }

    // Validate file types
    const invalidFiles = files.filter(file => {
      if (selectedType === 'photo') {
        return !file.type.startsWith('image/');
      } else {
        return !file.type.startsWith('video/');
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Invalid files selected: ${invalidFiles.length} file(s) are not ${selectedType}s`);
      return;
    }

    // Create object URLs for previews
    const newMediaItems = files.map((file, index) => {
      const preview = URL.createObjectURL(file);
      return {
        id: `${Date.now()}-${index}`,
        type: selectedType,
        file,
        preview,
        title: files.length === 1 ? batchTitle : `${batchTitle} ${index + 1}`,
        tags: []
      };
    });

    setMediaItems(prev => [...prev, ...newMediaItems]);
    setBatchTitle('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.preview);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const handleAddTag = (itemId: string, tag: string) => {
    setMediaItems(prev => prev.map(item => {
      if (item.id === itemId && !item.tags.includes(tag)) {
        return {
          ...item,
          tags: [...item.tags, tag]
        };
      }
      return item;
    }));
  };

  const handleRemoveTag = (itemId: string, tagToRemove: string) => {
    setMediaItems(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          tags: item.tags.filter(tag => tag !== tagToRemove)
        };
      }
      return item;
    }));
  };

  // Cleanup previews when component unmounts
  React.useEffect(() => {
    return () => {
      mediaItems.forEach(item => {
        URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  return (
    <div className="p-4 bg-black text-white">
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="w-6 h-6 text-blue-400" />
        <h1 className="text-xl font-bold">PG Photos & Videos</h1>
      </div>

      {/* File Upload Form */}
      <div className="bg-gray-900 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <Upload className="w-5 h-5 text-green-400" />
          <h2 className="font-semibold">Upload Media</h2>
        </div>

        <div className="space-y-4">
          {/* Media Type Selection */}
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedType('photo')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                selectedType === 'photo'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Photos</span>
            </button>
            <button
              onClick={() => setSelectedType('video')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                selectedType === 'video'
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Videos</span>
            </button>
          </div>

          {/* Batch Title */}
          <div>
            <label className="block text-sm font-medium mb-1">
              {selectedType === 'photo' ? 'Photo' : 'Video'} Title
              {' '}
              <span className="text-gray-400">(will be numbered for multiple files)</span>
            </label>
            <input
              type="text"
              value={batchTitle}
              onChange={(e) => setBatchTitle(e.target.value)}
              placeholder={`Enter ${selectedType} title`}
              className="w-full px-3 py-2 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-white"
            />
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select {selectedType === 'photo' ? 'Photos' : 'Videos'}
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept={selectedType === 'photo' ? 'image/*' : 'video/*'}
              multiple
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-white file:text-black hover:file:bg-gray-100 cursor-pointer"
            />
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Media Preview Grid */}
      {mediaItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mediaItems.map((item) => (
            <div key={item.id} className="group relative bg-gray-900 rounded-lg overflow-hidden">
              <div className="relative aspect-video">
                {item.type === 'photo' ? (
                  <img
                    src={item.preview}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Image failed to load:', e);
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTggMThIMlYySDIyVjIySDZNNiAxOEgxOE0xOCA2SDZNNiAxMEgxOE02IDE0SDE4IiBzdHJva2U9IiM5Q0EzQUYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PC9zdmc+';
                    }}
                  />
                ) : (
                  <video
                    src={item.preview}
                    title={item.title}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveMedia(item.id)}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-75 rounded-full text-white hover:bg-red-500 transition-colors duration-200"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm truncate">{item.title}</h3>
                
                {/* Tags Section */}
                <div className="mt-2">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {item.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(item.id, tag)}
                          className="ml-1 text-gray-400 hover:text-red-400"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {(item.type === 'photo' ? defaultPhotoTags : defaultVideoTags)
                      .filter(tag => !item.tags.includes(tag))
                      .map((tag, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddTag(item.id, tag)}
                          className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition-colors"
                        >
                          + {tag}
                        </button>
                      ))
                    }
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                  <div className="flex items-center space-x-2">
                    {item.type === 'photo' ? (
                      <ImageIcon className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Video className="w-4 h-4 text-purple-400" />
                    )}
                    <span className="capitalize">{item.type}</span>
                  </div>
                  <span>{(item.file.size / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Media Summary */}
      {mediaItems.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-800">
          <h2 className="text-lg font-semibold mb-3">Media Summary</h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>{mediaItems.filter(item => item.type === 'photo').length} Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-purple-400" />
              <span>{mediaItems.filter(item => item.type === 'video').length} Videos</span>
            </div>
            <div className="text-gray-400">
              Total Size: {(mediaItems.reduce((acc, item) => acc + item.file.size, 0) / (1024 * 1024)).toFixed(1)} MB
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PgMedia;