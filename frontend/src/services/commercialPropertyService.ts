import axios from 'axios';

// API base URL - adjust if needed based on your environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Service for handling commercial property API interactions
 */
export const CommercialPropertyService = {
  /**
   * Create a new commercial warehouse listing
   * @param warehouseData - The warehouse data to submit
   * @returns Promise with the response data
   */
  createWarehouse: async (warehouseData: any) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/commercial-warehouses`, 
        warehouseData, 
        {
          headers: {
            'Content-Type': 'application/json',
            // Add authorization if needed
            // 'Authorization': `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error || 'Failed to create warehouse listing');
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your connection');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error creating warehouse listing');
      }
    }
  }
};

export default CommercialPropertyService; 