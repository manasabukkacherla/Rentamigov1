import axios from 'axios';

interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'document';
  file: File;
  url?: string;
  title?: string;
  tags?: string[];
  category: string; // e.g., 'exterior', 'interior', 'floorPlan', etc.
}

/**
 * Uploads property media files (photos, videos, documents) to S3 via the backend API
 * @param propertyType - The type of property (e.g., 'apartment', 'builderFloor', etc.)
 * @param mediaItems - Array of media items to upload
 * @param propertyId - Optional ID of the property to associate the media with
 * @returns Promise with the uploaded media items including S3 URLs
 */
export const uploadPropertyMediaToS3 = async (
  propertyType: string,
  mediaItems: MediaItem[],
  propertyId?: string
): Promise<any[]> => {
  try {
    if (!mediaItems.length) {
      return [];
    }

    // Create a FormData object
    const formData = new FormData();
    
    // Add property type and ID if available
    formData.append('propertyType', propertyType);
    if (propertyId) {
      formData.append('propertyId', propertyId);
    }
    
    // Log what we're uploading
    console.log('Uploading media files:', mediaItems.map(f => ({
      id: f.id,
      type: f.type,
      category: f.category,
      fileName: f.file instanceof File ? f.file.name : 'string URL'
    })));
    
    // Special logging for video files
    const videoFiles = mediaItems.filter(f => f.type === 'video');
    if (videoFiles.length > 0) {
      console.log(`Found ${videoFiles.length} video files to upload:`, 
        videoFiles.map(v => v.file instanceof File ? v.file.name : 'string URL'));
    }
    
    // Prepare metadata for each file
    const mediaData: any[] = [];

    // Add each file to the FormData
    mediaItems.forEach((item) => {
      if (item.file) {
        // Special handling for video files
        if (item.type === 'video') {
          console.log('Preparing to upload video:', {
            id: item.id,
            category: item.category,
            fileType: item.file.type,
            fileSize: `${(item.file.size / (1024 * 1024)).toFixed(2)} MB`
          });
          
          // For videos, always use a special naming convention to ensure proper handling
          const videoFileName = `VIDEO_${item.id}`;
          formData.append('mediaFiles', item.file, videoFileName);
          console.log(`Added video file to FormData with name: ${videoFileName}`);
        } else {
          // Use the item's ID as the file name for matching on the server for non-video files
          formData.append('mediaFiles', item.file, item.id);
        }

        // Add metadata for this file
        mediaData.push({
          id: item.id,
          type: item.type,
          title: item.title || '',
          tags: item.tags || [],
          category: item.category
        });
        
        // Additional logging for video files
        if (item.type === 'video') {
          console.log(`Added video with ID ${item.id} to form data for upload`);
        }
      }
    });

    // Add the metadata as a JSON string
    formData.append('mediaData', JSON.stringify(mediaData));

    // Make the API call with timeout and retry logic for multiple videos
    const videoCount = mediaItems.filter(item => item.type === 'video').length;
    const timeout = videoCount > 3 ? 180000 : 120000; // 3 minutes for >3 videos, 2 minutes otherwise
    
    // Function to attempt upload with retry logic
    const attemptUpload = async (retries = 2): Promise<any> => {
      try {
        return await axios.post(
          '/api/property-media/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: timeout,
          }
        );
      } catch (error: any) {
        if (retries > 0 && (error.code === 'ECONNABORTED' || error.message.includes('timeout'))) {
          console.log(`Upload timed out, retrying... (${retries} attempts left)`);
          return attemptUpload(retries - 1);
        }
        throw error;
      }
    };
    
    const response = await attemptUpload();
    
    if (response.data.success) {
      // The backend now returns the uploaded media items in a different structure
      // Convert the response to the format expected by the frontend
      const mediaItems = [];
      
      // Process the response based on the structure
      if (response.data.data && response.data.data.media) {
        const { photos, videoTour, documents } = response.data.data.media;
        
        // Process photos
        if (photos) {
          // Define a type for photoDetail for clarity, mirroring backend's IPhotoDetail
          // This helps in understanding the structure of objects in photoDetailsArray
          interface PhotoDetailFromBackend {
            id: string;
            url: string;
            title?: string;
            // category is implicitly part of the structure from backend but we use the 'category' key from Object.entries
            tags?: string[];
          }

          Object.entries(photos).forEach(([category, photoDetailsArray]) => {
            // photoDetailsArray is an array of objects, each conforming to PhotoDetailFromBackend
            (photoDetailsArray as PhotoDetailFromBackend[]).forEach((photoDetail: PhotoDetailFromBackend) => {
              mediaItems.push({
                id: photoDetail.id, // Use the ID from the backend
                type: 'photo',
                url: photoDetail.url, // Use the URL from the photoDetail object
                category: category, // Use the category key from Object.entries
                title: photoDetail.title,
                tags: photoDetail.tags
              });
            });
          });
        }
        
        // Process video
        if (videoTour) {
          mediaItems.push({
            id: videoTour.split('/').pop()?.split('-')[0] || Math.random().toString(),
            type: 'video',
            url: videoTour,
            category: 'videoTour'
          });
        }
        
        // Process documents
        if (documents) {
          documents.forEach((url: string) => {
            mediaItems.push({
              id: url.split('/').pop()?.split('-')[0] || Math.random().toString(),
              type: 'document',
              url,
              category: 'documents'
            });
          });
        }
      } else if (response.data.data && response.data.data.mediaItems) {
        // Handle the old response format if it exists
        return response.data.data.mediaItems;
      }
      
      return mediaItems;
    } else {
      throw new Error(response.data.error || 'Failed to upload media');
    }
  } catch (error: any) {
    console.error('Error uploading property media:', error);
    throw new Error(error.message || 'Failed to upload media to S3');
  }
};

/**
 * Deletes a media item from S3 via the backend API
 * @param propertyId - The ID of the property
 * @param propertyType - The type of property
 * @param mediaId - The ID of the media item to delete
 * @returns Promise with success status
 */
export const deletePropertyMediaFromS3 = async (
  propertyId: string,
  propertyType: string,
  mediaId: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`/api/property-media/${propertyType}/${propertyId}/${mediaId}`);
    
    return response.data.success;
  } catch (error: any) {
    console.error('Error deleting property media:', error);
    throw new Error(error.message || 'Failed to delete media from S3');
  }
};

/**
 * Fetches all media items for a property
 * @param propertyId - The ID of the property
 * @param propertyType - The type of property
 * @returns Promise with the media items
 */
export const getPropertyMediaFromS3 = async (
  propertyId: string,
  propertyType: string
): Promise<any> => {
  try {
    const response = await axios.get(`/api/property-media/${propertyType}/${propertyId}`);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch media');
    }
  } catch (error: any) {
    console.error('Error fetching property media:', error);
    throw new Error(error.message || 'Failed to fetch media from S3');
  }
};
