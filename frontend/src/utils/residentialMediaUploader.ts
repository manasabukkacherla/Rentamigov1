import axios from 'axios';

interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'document';
  file: File;
  title?: string;
  category: string;
}

/**
 * Uploads residential property media files (photos and videos) to S3 via the backend API
 * @param propertyType - The type of residential property (e.g., 'apartment', 'independentHouse', etc.)
 * @param mediaItems - Array of media items to upload
 * @param propertyId - Optional ID of the property to associate the media with
 * @returns Promise with the uploaded media items including S3 URLs
 */
export const uploadResidentialMediaToS3 = async (
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
      fileName: f.file.name
    })));
    
    // Special logging for video files
    const videoFiles = mediaItems.filter(f => f.type === 'video');
    if (videoFiles.length > 0) {
      console.log(`Found ${videoFiles.length} video files to upload:`, 
        videoFiles.map(v => v.file.name));
    }
    
    // Prepare metadata for each file
    const mediaData: any[] = [];

    // Add each file to the FormData
    mediaItems.forEach((item) => {
      // Use the item's ID as the file name for matching on the server
      formData.append('mediaFiles', item.file, item.id);

      // Add metadata for this file
      mediaData.push({
        id: item.id,
        type: item.type,
        title: item.title || '',
        category: item.category
      });
      
      // Additional logging for video files
      if (item.type === 'video') {
        console.log(`Added video with ID ${item.id} to form data for upload`);
      }
    });

    // Add the metadata as a JSON string
    formData.append('mediaData', JSON.stringify(mediaData));

    // Make the API call with timeout and retry logic for multiple videos
    const videoCount = mediaItems.filter(item => item.type === 'video').length;
    const timeout = videoCount > 3 ? 180000 : 120000;
    
    // Function to attempt upload with retry logic
    const attemptUpload = async (retries = 2): Promise<any> => {
      try {
        return await axios.post(
          '/api/residential/media/upload',
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
      return response.data.data.mediaItems;
    } else {
      throw new Error(response.data.error || 'Failed to upload media');
    }
  } catch (error: any) {
    console.error('Error uploading residential media:', error);
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
export const deleteResidentialMediaFromS3 = async (
  propertyId: string,
  propertyType: string,
  mediaId: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`/api/residential/media/${propertyType}/${propertyId}/${mediaId}`);
    
    return response.data.success;
  } catch (error: any) {
    console.error('Error deleting residential media:', error);
    throw new Error(error.message || 'Failed to delete media from S3');
  }
};

/**
 * Fetches all media items for a property
 * @param propertyId - The ID of the property
 * @param propertyType - The type of property
 * @returns Promise with the media items
 */
export const getResidentialMediaFromS3 = async (
  propertyId: string,
  propertyType: string
): Promise<any> => {
  try {
    const response = await axios.get(`/api/residential/media/${propertyType}/${propertyId}`);
    
    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch media');
    }
  } catch (error: any) {
    console.error('Error fetching residential media:', error);
    throw new Error(error.message || 'Failed to fetch media from S3');
  }
}; 