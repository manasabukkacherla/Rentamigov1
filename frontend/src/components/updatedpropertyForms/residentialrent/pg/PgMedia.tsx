import React, { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Image as ImageIcon, Video, X, Camera, Users, Home, Plus, ChevronDown, ChevronUp, AlertCircle, Key, Lightbulb } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { uploadPgMediaToS3 } from '../../../../utils/pgMediaUploader';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  file: File;
  preview: string;
  title: string;
  tags: string[];
  roomType?: string;
  category?: string; // For categorizing common areas
  uploaded?: boolean;
  url?: string;
}

interface RoomTypeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface PgMediaProps {
  selectedShares: string[];
  customShare: string;
  mediaItems: any[];
  onMediaItemsChange: (mediaItems: any[]) => void;
  propertyId?: string;
}

const PgMedia: React.FC<PgMediaProps> = ({ selectedShares, customShare, mediaItems: propMediaItems, onMediaItemsChange, propertyId }) => {
  // Initialize all state variables at the top of the component
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [batchTitle, setBatchTitle] = useState('');
  const [selectedType, setSelectedType] = useState<'photo' | 'video'>('photo');
  const [error, setError] = useState('');
  const [newTag, setNewTag] = useState('');
  const [selectedRoomType, setSelectedRoomType] = useState<string>('');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const defaultPhotoTags = ['Exterior', 'Interior', 'Room', 'Bathroom', 'Kitchen', 'Common Area'];
  const defaultVideoTags = ['Room Tour', 'Facility Tour', 'Amenities', 'Overview'];



  // Check file size for videos
  const checkVideoFileSize = (file: File): void => {
    if (file.type.startsWith('video/') && file.size > 50 * 1024 * 1024) { // 50MB limit for videos
      throw new Error(`Video file size exceeds 50MB limit: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    }
  };

  // Process media items and update parent component
  const processAndUpdateMediaItems = async (items: MediaItem[]) => {
    try {
      setError(''); // Clear any previous errors

      const photoItems = items.filter(item => item.type === 'photo');
      const videoItems = items.filter(item => item.type === 'video');

      console.log(`Processing ${photoItems.length} photos and ${videoItems.length} videos`);

      // Check video file sizes
      for (const item of videoItems) {
        if (item.file) {
          try {
            checkVideoFileSize(item.file);
          } catch (error: any) {
            console.error('Video file size error:', error);
            toast.error(error.message);
            setError(error.message);
            return;
          }
        }
      }

      // Check video formats
      for (const item of videoItems) {
        if (item.file && !['video/mp4', 'video/webm', 'video/quicktime'].includes(item.file.type)) {
          console.warn(`Unsupported video format: ${item.file.type}. Please use MP4, WebM, or MOV format.`);
          toast.error(`Unsupported video format: ${item.file.type}. Please use MP4, WebM, or MOV format.`);
        }
      }

      // Always upload to S3 regardless of whether propertyId is available
      // Show loading toast
      toast.loading('Uploading media to server...', { id: 'media-upload' });

      // Prepare items for S3 upload
      const itemsToUpload = items.map(item => ({
        id: item.id,
        type: item.type,
        file: item.file,
        title: item.title,
        tags: item.tags,
        roomType: item.roomType,
        category: item.category
      }));

      try {
        // Upload to S3 - propertyId is now optional in the function
        const uploadedItems = await uploadPgMediaToS3(itemsToUpload, propertyId);

        // Show success toast
        toast.success(`Successfully uploaded ${uploadedItems.length} files`, { id: 'media-upload' });

        // Update local state with uploaded items
        setMediaItems(items.map(item => {
          const uploadedItem = uploadedItems.find(ui => ui.id === item.id);
          if (uploadedItem) {
            return {
              ...item,
              url: uploadedItem.url, // Use the S3 URL
              uploaded: true
            };
          }
          return item;
        }));

        // Update parent component with uploaded items
        onMediaItemsChange(uploadedItems);
      } catch (uploadError: any) {
        console.error('Error uploading to S3:', uploadError);
        toast.error(`Error uploading: ${uploadError.message}`, { id: 'media-upload' });
        setError(uploadError.message || 'Failed to upload media to server');
      }
    } catch (error: any) {
      console.error('Error processing media items:', error);
      setError(error.message || 'Failed to process media items');
    }
  };

  const roomTypeOptions: RoomTypeOption[] = [
    { id: 'single', label: 'Single Room', icon: <Home className="h-4 w-4" /> },
    { id: 'double', label: 'Double Share Room', icon: <Users className="h-4 w-4" /> },
    { id: 'triple', label: 'Triple Share Room', icon: <Users className="h-4 w-4" /> },
    { id: 'four', label: 'Four Share Room', icon: <Users className="h-4 w-4" /> },
    { id: 'five', label: 'Five Share Room', icon: <Users className="h-4 w-4" /> },
    { id: 'custom', label: 'Custom Share Room', icon: <Users className="h-4 w-4" /> },
    { id: 'lifts', label: 'Lifts', icon: <Lightbulb className="h-4 w-4" /> },
    { id: 'dining', label: 'Dining Hall', icon: <Users className="h-4 w-4" /> },
    { id: 'staircases', label: 'Staircases', icon: <Home className="h-4 w-4" /> },
    { id: 'kitchen', label: 'Kitchen Area', icon: <Key className="h-4 w-4" /> }

    // custom/multi-share will be handled separately
  ];

  // Filter roomTypeOptions to only those currently selected
  const selectedRoomTypeOptions = roomTypeOptions.filter(opt => selectedShares.includes(opt.id));

  // If 'more' (custom/multi-share) is selected and customShare is set, add a dynamic option
  const showCustomShare = selectedShares.includes('more') && customShare && Number(customShare) >= 6;

  const toggleSection = (sectionId: string) => {
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionId);
      setSelectedRoomType(sectionId);
    }
  };

  const startCamera = async (roomType: string) => {
    setSelectedRoomType(roomType);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });

      setCameraStream(stream);
      setCameraActive(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Camera access failed. Please check your permissions.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw current video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Get base64 data directly from canvas
        const base64Data = canvas.toDataURL('image/jpeg', 0.9);

        // Convert canvas to file for preview
        canvas.toBlob((blob) => {
          if (blob) {
            const capturedFileName = `captured-photo-${Date.now()}.jpg`;
            const file = new File([blob], capturedFileName, { type: 'image/jpeg' });

            // Create media item for the captured photo with base64 data
            const newMediaItem: MediaItem = {
              id: `captured-${Date.now()}`,
              type: 'photo',
              file: file,
              preview: URL.createObjectURL(blob),
              title: batchTitle || `${getRoomTypeLabel(selectedRoomType)} Photo`,
              tags: [],
              roomType: selectedRoomType || undefined,
              category: selectedRoomType === 'lifts' || selectedRoomType === 'dining' ||
                selectedRoomType === 'staircases' || selectedRoomType === 'kitchen' ?
                selectedRoomType : undefined
            };

            const updatedItems = [...mediaItems, newMediaItem];
            setMediaItems(updatedItems);
            processAndUpdateMediaItems(updatedItems);
            stopCamera();
          }
        }, 'image/jpeg', 0.9);
      }
    }
  };

  useEffect(() => {
    // Cleanup camera when component unmounts
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraStream]);

  useEffect(() => {
    if (cameraActive && videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraActive, cameraStream]);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>, roomType?: string, category?: string) => {
    setError('');
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setError('Please select at least one file');
      return;
    }

    const title = batchTitle || `${category || getRoomTypeLabel(roomType || selectedRoomType)} ${selectedType === 'photo' ? 'Photo' : 'Video'}`;

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

    // Validate video file sizes and formats
    if (selectedType === 'video') {
      // Check for unsupported video formats
      const unsupportedVideos = files.filter(file =>
        !['video/mp4', 'video/webm', 'video/quicktime'].includes(file.type)
      );

      if (unsupportedVideos.length > 0) {
        setError(`Unsupported video format(s). Please use MP4, WebM, or MOV formats only.`);
        return;
      }

      // Check for oversized videos
      const oversizedVideos = files.filter(file => file.size > 100 * 1024 * 1024); // 100MB limit

      if (oversizedVideos.length > 0) {
        setError(`Video file(s) exceed the 100MB size limit. Please compress your videos.`);
        return;
      }

      // Warning for large videos
      const largeVideos = files.filter(file => file.size > 20 * 1024 * 1024); // 20MB threshold

      if (largeVideos.length > 0) {
        console.warn(`Large video file(s) detected (${largeVideos.length}). These may take longer to process.`);
      }

      // Limit the number of videos that can be uploaded at once
      if (files.length > 6) {
        setError(`Please upload a maximum of 6 videos at a time to avoid processing issues.`);
        return;
      }
    }

    // Create object URLs for previews and prepare for base64 conversion
    const newMediaItems = files.map((file, index) => {
      const preview = URL.createObjectURL(file);
      return {
        id: `${Date.now()}-${index}`,
        type: selectedType,
        file,
        preview,
        title: files.length === 1 ? title : `${title} ${index + 1}`,
        tags: [],
        roomType: roomType || selectedRoomType || undefined,
        category: category
      };
    });

    try {
      // Show appropriate loading message based on number of videos
      if (selectedType === 'video' && files.length > 1) {
        const duration = files.length > 3 ? 10000 : 5000; // Longer duration for more videos
        const message = files.length > 3
          ? `Processing ${files.length} videos. This may take several minutes...`
          : `Processing ${files.length} videos. This may take a moment...`;

        toast.loading(message, {
          id: 'video-processing',
          duration: duration
        });

        // For larger batches of videos (4-6), show additional info
        if (files.length > 3) {
          console.log(`Processing ${files.length} videos. Uploading to S3 may take several minutes.`);
          setTimeout(() => {
            if (files.length > 3) {
              toast.loading('Still uploading videos to S3. Please be patient...', {
                id: 'video-processing-update',
                duration: 15000
              });
            }
          }, duration);
        }
      }

      if (e.target) {
        e.target.value = '';
      }

      // Dismiss loading toast if it was shown
      if (selectedType === 'video' && files.length > 1) {
        toast.success(`Successfully processed ${files.length} videos`, {
          id: 'video-processing'
        });
      }

      // Process and add the new media items
      setMediaItems(prevItems => [...prevItems, ...newMediaItems]);
      processAndUpdateMediaItems([...mediaItems, ...newMediaItems]);

    } catch (error: any) {
      console.error('Error handling file selection:', error);
      setError(error.message || 'Failed to process selected files');

      // Dismiss loading toast with error if it was shown
      if (selectedType === 'video' && files.length > 1) {
        toast.error(`Error processing videos: ${error.message || 'Unknown error'}`, {
          id: 'video-processing'
        });
      }

      // Clean up object URLs for failed uploads
      newMediaItems.forEach(item => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });

      // Reset the file input
      if (e.target) {
        e.target.value = '';
      }
    }
  };

  const handleRemoveMedia = (id: string) => {
    setMediaItems(prev => {
      const itemToRemove = prev.find(item => item.id === id);
      if (itemToRemove) {
        URL.revokeObjectURL(itemToRemove.preview);
      }
      const updatedItems = prev.filter(item => item.id !== id);
      // Update parent component
      processAndUpdateMediaItems(updatedItems);
      return updatedItems;
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

  // Get media items for a specific room type
  const getMediaItemsByRoomType = (roomType: string) => {
    return mediaItems.filter(item => item.roomType === roomType);
  };

  // Get room type label from id
  const getRoomTypeLabel = (roomTypeId: string): string => {
    const option = roomTypeOptions.find(opt => opt.id === roomTypeId);
    return option ? option.label : 'Unknown';
  };

  // Initialize from props when component mounts or props change
  React.useEffect(() => {
    if (propMediaItems && propMediaItems.length > 0) {
      // Convert from parent format to local format if needed
      const convertedItems = propMediaItems.map(item => {
        // If the item already has a preview and file, use it as is
        if (item.preview && item.file) return item;

        // Otherwise, create a MediaItem from the parent format
        return {
          id: item.id || `imported-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          type: item.type || 'photo',
          // We don't have the original file, but we can use the URL as preview
          preview: item.url,
          base64: item.url,
          title: item.title || 'Imported Media',
          tags: item.tags || [],
          roomType: item.roomType,
          category: item.category
        };
      });

      setMediaItems(convertedItems);
    }
  }, []);

  // Cleanup previews when component unmounts
  React.useEffect(() => {
    return () => {
      mediaItems.forEach(item => {
        if (item.preview) URL.revokeObjectURL(item.preview);
      });
    };
  }, []);

  const renderRoomTypeMediaUploader = (roomType: RoomTypeOption) => {
    const roomItems = getMediaItemsByRoomType(roomType.id);
    const isExpanded = expandedSection === roomType.id;

    return (
      <div key={roomType.id} className="border border-gray-200 rounded-lg overflow-hidden mb-4 bg-white">
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 cursor-pointer ${isExpanded ? 'bg-gray-50 border-b border-gray-200' : ''}`}
          onClick={() => toggleSection(roomType.id)}
        >
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-md bg-gray-100">
              {roomType.icon}
            </div>
            <h3 className="font-medium text-gray-900">{roomType.label}</h3>
            <span className="text-sm text-gray-500">
              ({roomItems.length} {roomItems.length === 1 ? 'item' : 'items'})
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="p-4">
            <div className="space-y-4">
              {/* Media Type Selector */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedType('photo')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${selectedType === 'photo'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span>Photos</span>
                </button>
                <button
                  onClick={() => setSelectedType('video')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${selectedType === 'video'
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                    }`}
                >
                  <Video className="w-4 h-4" />
                  <span>Videos</span>
                </button>
              </div>

              {/* Upload Controls */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Upload {roomType.label} {selectedType === 'photo' ? 'Photos' : 'Videos'}
                  </label>
                  <input
                    type="file"
                    accept={selectedType === 'photo' ? 'image/*' : 'video/*'}
                    multiple
                    onChange={(e) => handleFileSelect(e, roomType.id)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-200 file:text-black hover:file:bg-gray-300 cursor-pointer"
                  />
                </div>

                {selectedType === 'photo' && (
                  <div className="flex-none">
                    <label className="block text-sm font-medium mb-1">Take Photo</label>
                    <button
                      onClick={() => startCamera(roomType.id)}
                      className="flex items-center justify-center px-4 py-2 rounded-md w-full bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Camera className="w-4 h-4 mr-2" />
                      Use Camera
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Preview */}
              {roomItems.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">
                    {roomType.label} Gallery ({roomItems.length})
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {roomItems.map(item => (
                      <div key={item.id} className="relative aspect-square rounded-md overflow-hidden group">
                        {item.type === 'photo' ? (
                          <img src={item.preview} alt={item.title} className="w-full h-full object-cover" />
                        ) : (
                          <video src={item.preview} className="w-full h-full object-cover" controls muted />
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            onClick={() => handleRemoveMedia(item.id)}
                            className="p-1.5 bg-red-500 rounded-full text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Add more button */}
                    <div className="flex items-center justify-center aspect-square rounded-md border-2 border-dashed border-gray-300 hover:border-gray-400 cursor-pointer transition-colors">
                      <input
                        type="file"
                        accept={selectedType === 'photo' ? 'image/*' : 'video/*'}
                        multiple
                        onChange={(e) => handleFileSelect(e, roomType.id)}
                        className="hidden"
                        id={`add-more-${roomType.id}`}
                      />
                      <label htmlFor={`add-more-${roomType.id}`} className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                        <Plus className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-500 mt-1">Add more</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRoomTypeGalleries = () => {
    return (
      <div className="mt-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-900">Room Configuration Galleries</h2>

        {roomTypeOptions.map(roomType => {
          const roomItems = getMediaItemsByRoomType(roomType.id);
          if (roomItems.length === 0) return null;

          return (
            <div key={roomType.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                {roomType.icon}
                <h3 className="font-medium text-gray-900">{roomType.label} ({roomItems.length})</h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {roomItems.map(item => (
                  <div key={item.id} className="relative aspect-square rounded-md overflow-hidden">
                    {item.type === 'photo' ? (
                      <img src={item.preview} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <video src={item.preview} controls muted className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => handleRemoveMedia(item.id)}
                        className="p-1 bg-red-500 rounded-full text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white text-black">
      <div className="flex items-center space-x-2 mb-4">
        <Camera className="w-6 h-6 text-blue-400" />
        <h1 className="text-xl font-bold">PG Photos & Videos</h1>
      </div>

      {/* Room Type Specific Upload Sections */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Upload Media by Room Type</h2>
        <div className="space-y-2">
          {roomTypeOptions.map(roomType => renderRoomTypeMediaUploader(roomType))}
        </div>
      </div>

      {/* Common Area Facility Upload Sections */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Common Area Photos</h2>
        {[
          { id: 'lifts', label: 'Lifts', icon: <Lightbulb className="h-4 w-4" /> },
          { id: 'dining', label: 'Dining Hall', icon: <Users className="h-4 w-4" /> },
          { id: 'staircases', label: 'Staircases', icon: <Home className="h-4 w-4" /> },
          { id: 'kitchen', label: 'Kitchen Area', icon: <Key className="h-4 w-4" /> }
        ].map(facility => (
          <div key={facility.id} className="mb-6">
            <label className="block font-medium mb-2">{facility.label} Photos</label>
            <div className="flex flex-col md:flex-row gap-4 mb-2">
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={e => handleFileSelect(e, facility.id, facility.label)}
                  className="mb-2"
                />
              </div>
              <div className="flex-none">
                <button
                  onClick={() => startCamera(facility.id)}
                  className="flex items-center justify-center px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo
                </button>
              </div>
            </div>
            {/* Preview grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mediaItems.filter(item => item.roomType === facility.id || item.category === facility.label).map(item => (
                <div key={item.id} className="relative aspect-square rounded-md overflow-hidden">
                  <img src={item.preview} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => handleRemoveMedia(item.id)}
                      className="p-1 bg-red-500 rounded-full text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Camera Preview - Shared across all sections */}
      {cameraActive && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-100 flex justify-between items-center">
              <h3 className="font-medium">Taking photo for {getRoomTypeLabel(selectedRoomType)}</h3>
              <button
                onClick={stopCamera}
                className="p-1 rounded-full hover:bg-gray-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 md:h-80 object-cover"
              />
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <button
                  onClick={capturePhoto}
                  className="p-4 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <Camera className="w-6 h-6 text-black" />
                </button>
              </div>
            </div>
            <div className="p-4 bg-gray-100">
              <div className="flex justify-between items-center">
                <button
                  onClick={stopCamera}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <span className="text-sm text-gray-500">Position the room in frame and tap the camera button</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="my-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Media Summary */}
      {mediaItems.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Media Summary</h2>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-blue-500" />
              <span>{mediaItems.filter(item => item.type === 'photo').length} Photos</span>
            </div>
            <div className="flex items-center space-x-2">
              <Video className="w-4 h-4 text-purple-500" />
              <span>{mediaItems.filter(item => item.type === 'video').length} Videos</span>
            </div>
            <div className="text-gray-500">
              Total Size: {(mediaItems.reduce((acc, item) => acc + (item.file ? item.file.size : 0), 0) / (1024 * 1024)).toFixed(1)} MB
            </div>
          </div>

          {/* Room Type Distribution */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {roomTypeOptions.map(roomType => {
              const count = mediaItems.filter(item => item.roomType === roomType.id).length;
              if (count === 0) return null;

              return (
                <div key={roomType.id} className="flex items-center space-x-2 bg-gray-50 p-2 rounded">
                  {roomType.icon}
                  <span className="text-sm text-gray-700">{roomType.label}: {count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default PgMedia;