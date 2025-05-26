import axios from 'axios';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  file: File;
  url?: string;
  title: string;
  tags: string[];
  roomType?: string;
  category?: string;
}

/**
 * Uploads PG media files (photos and videos) to S3 via the backend API
 * @param mediaItems - Array of media items to upload
 * @param propertyId - Optional ID of the PG property to associate the media with
 * @returns Promise with the uploaded media items
 */
export const uploadPgMediaToS3 = async (
  mediaItems: MediaItem[],
  propertyId?: string
): Promise<any[]> => {
  try {
    if (!mediaItems.length) {
      return [];
    }

    // Create a FormData object to send files
    const formData = new FormData();

    // Only append propertyId if it exists
    if (propertyId) {
      formData.append('propertyId', propertyId);
    }

    // Prepare metadata for each file
    const mediaData: any[] = [];

    // Add each file to the FormData
    mediaItems.forEach((item) => {
      if (item.file) {
        // Use the item's ID as the file name for matching on the server
        formData.append('mediaFiles', item.file, item.id);

        // Add metadata for this file
        mediaData.push({
          id: item.id,
          type: item.type,
          title: item.title,
          tags: item.tags,
          roomType: item.roomType,
          category: item.category
        });
      }
    });

    // Add the metadata as a JSON string
    formData.append('mediaData', JSON.stringify(mediaData));

    // Use a generous fixed timeout (5 minutes)
    const timeout = 300000; // 5 minutes

    // Function to attempt upload with retry logic
    const attemptUpload = async (retries = 2): Promise<any> => {
      try {
        return await axios.post(
          '/api/residential/pg-media/upload',
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
    console.error('Error uploading PG media:', error);
    throw new Error(error.message || 'Failed to upload media to S3');
  }
};

/**
 * Deletes a media item from S3 via the backend API
 * @param propertyId - The ID of the PG property
 * @param mediaId - The ID of the media item to delete
 * @returns Promise with success status
 */
export const deletePgMediaFromS3 = async (
  propertyId: string,
  mediaId: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(`/api/residential/pg-media/${propertyId}/${mediaId}`);
    return response.data.success;
  } catch (error: any) {
    console.error('Error deleting PG media:', error);
    throw new Error(error.message || 'Failed to delete media from S3');
  }
};

/**
 * Fetches all media items for a PG property
 * @param propertyId - The ID of the PG property
 * @returns Promise with the media items
 */
export const getPgMediaFromS3 = async (
  propertyId: string
): Promise<any> => {
  try {
    const response = await axios.get(`/api/residential/pg-media/${propertyId}`);

    if (response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.error || 'Failed to fetch media');
    }
  } catch (error: any) {
    console.error('Error fetching PG media:', error);
    throw new Error(error.message || 'Failed to fetch media from S3');
  }
};
