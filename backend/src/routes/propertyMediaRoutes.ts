import express from 'express';
import { propertyMediaUpload, processAndUploadPropertyMedia } from '../middleware/propertyMediaUploader';
import mongoose from 'mongoose';

// Import all residential models
import ResidentialRentApartment from '../models/residential/residentialRentApartment';
import ResidentialRentBuilderFloor from '../models/residential/residentialRentBuilderFloor';
import ResidentialRentIndependent from '../models/residential/residentialRentIndependent';

const router = express.Router();

// Map property types to their respective models
const propertyModels: { [key: string]: mongoose.Model<any> } = {
  'apartment': ResidentialRentApartment,
  'builderFloor': ResidentialRentBuilderFloor,
  'independentHouse': ResidentialRentIndependent,
  // Add more property types as needed
};

/**
 * Route to upload media files to S3 and save to MongoDB
 */
router.post('/upload', propertyMediaUpload, processAndUploadPropertyMedia, async (req, res) => {
  try {
    const { propertyId, propertyType } = req.body;
    const mediaItems = req.mediaItems;

    // PropertyType is required for organizing files in S3
    if (!propertyType) {
      return res.status(400).json({ success: false, error: 'Property type is required' });
    }
    
    // PropertyId is completely optional - we'll proceed with upload even without it

    if (!mediaItems || !Array.isArray(mediaItems) || mediaItems.length === 0) {
      return res.status(400).json({ success: false, error: 'No media items were processed' });
    }

    // Group media items by category and type
    const photos: { [category: string]: string[] } = {};
    const documents: string[] = [];
    let videoTour: string = ''; // Initialize as empty string instead of null
    
    // Property is optional - we'll only try to find it if a propertyId is provided
    let property: any;
    let propertyFound = false;
    if (propertyId) {
      // Get the model for this property type
      if (!propertyModels[propertyType]) {
        // Just log the error but continue with the upload
        console.warn(`Invalid property type: ${propertyType}. Media will be uploaded but not linked to a property.`);
      } else {
        const PropertyModel = propertyModels[propertyType];
        
        try {
          // Find the property
          property = await PropertyModel.findOne({ propertyId });
          
          if (property) {
            propertyFound = true;
            // Initialize media structure if it doesn't exist
            if (!property.media) {
              property.media = { photos: {}, documents: [], videoTour: '' };
            }
            
            // Ensure photos object exists
            if (!property.media.photos) {
              property.media.photos = {};
            }
            
            // Ensure documents array exists
            if (!property.media.documents) {
              property.media.documents = [];
            }
          } else {
            console.warn(`Property not found with ID: ${propertyId}. Media will be uploaded but not linked to a property.`);
          }
        } catch (findError) {
          console.error('Error finding property:', findError);
          // Continue with upload even if property lookup fails
        }
      }
    }

    // Log all media items for debugging
    console.log('Processing media items:', mediaItems);
    
    // Process each media item
    mediaItems.forEach(item => {
      if (item.type === 'photo') {
        if (!photos[item.category]) {
          photos[item.category] = [];
        }
        photos[item.category].push(item.url);
        console.log(`Added photo to category ${item.category}:`, item.url);
      } else if (item.type === 'video') {
        // All videos are treated as videoTour
        videoTour = item.url;
        
        // Immediate prominent logging of video URL
        console.log('\n==================================');
        console.log('🎬 VIDEO URL RECEIVED IN ROUTE 🎬');
        console.log('AWS S3 VIDEO URL:', item.url);
        console.log('==================================\n');
        
        // Double check that we have a valid URL
        if (!item.url || typeof item.url !== 'string' || !item.url.startsWith('http')) {
          console.error('❌ INVALID VIDEO URL:', item.url);
        } else {
          console.log('✅ VALID VIDEO URL CONFIRMED');
          console.log('Type:', typeof item.url);
          console.log('Length:', item.url.length);
          console.log('Will be saved to database as videoTour field');
        }
      } else if (item.type === 'document') {
        documents.push(item.url);
        console.log('Document uploaded successfully:', item.url);
      }
    });
    
    // Final check for video URL
    if (videoTour) {
      console.log('Final videoTour URL before saving:', videoTour);
    } else {
      console.log('No videoTour URL found in processed media items');
    }
    
    // If propertyId is provided and property was found, update the property document
    if (propertyId && propertyFound && property) {
      // Merge new photos with existing ones
      Object.entries(photos).forEach(([category, urls]) => {
        if (!property.media.photos[category]) {
          property.media.photos[category] = [];
        }
        property.media.photos[category] = [...property.media.photos[category], ...urls];
        // Mark each category as modified
        property.markModified(`media.photos.${category}`);
      });
      
      // Set videoTour if provided - ENHANCED APPROACH
      if (videoTour) {
        console.log('Setting videoTour in property document:', videoTour);
        
        // Force direct assignment to ensure it's set
        if (!property.media) {
          property.media = {};
        }
        
        // Use direct assignment to ensure it's set properly
        property.media.videoTour = videoTour;
        
        // Log the value after assignment
        console.log('✅ Video tour URL set in property object:', property.media.videoTour);
        
        // Try alternative approach if needed
        try {
          // Use $set operator directly to ensure it's set
          property.set('media.videoTour', videoTour);
          console.log('Also used set() method as backup');
        } catch (setError) {
          console.error('Error using set() method:', setError);
        }
      } else if (!property.media.videoTour) {
        // Set to empty string if it doesn't already exist
        property.media.videoTour = '';
        property.set('media.videoTour', '');
        console.log('Setting empty videoTour field to ensure it exists in the document');
      }
      
      // Explicitly mark the field as modified for Mongoose - ALWAYS DO THIS
      property.markModified('media');
      property.markModified('media.videoTour');
      
      // Double check that the field is set
      console.log('VERIFICATION - videoTour field after setting:', property.media.videoTour);

      // Update documents if provided
      if (documents.length > 0) {
        if (!property.media.documents) {
          property.media.documents = [];
        }
        property.media.documents = [...property.media.documents, ...documents];
        // Mark documents as modified
        property.markModified('media.documents');
      }

      // Save the updated property
      try {
        // Try direct update first to ensure videoTour is set
        if (videoTour) {
          // Use direct MongoDB update to ensure the field is set
          const updateResult = await propertyModels[propertyType].updateOne(
            { propertyId },
            { $set: { 'media.videoTour': videoTour } }
          );
          console.log('Direct DB update result:', updateResult);
        }
        
        // Then save the full document with explicit validation
        await property.save({ validateBeforeSave: true });
        console.log('Property saved successfully with updated media');
        
        // Double-check that videoTour was saved correctly
        if (videoTour) {
          const updatedProperty = await propertyModels[propertyType].findOne({ propertyId });
          console.log('Verification - videoTour after save:', updatedProperty?.media?.videoTour);
          
          // If still not set, try one more direct update
          if (!updatedProperty?.media?.videoTour) {
            console.log('⚠️ videoTour still not set after save, trying direct update again');
            await propertyModels[propertyType].updateOne(
              { propertyId },
              { 
                $set: { 'media.videoTour': videoTour },
                $currentDate: { updatedAt: true }
              }
            );
            console.log('Final direct update completed');
          }
        }
      } catch (saveError) {
        console.error('Error saving property with updated media:', saveError);
        throw saveError;
      }

      return res.status(200).json({
        success: true,
        message: 'Media uploaded successfully and saved to property',
        data: {
          media: property.media
        }
      });
    } else {
      // If no propertyId is provided or property wasn't found, just return the media URLs
      const mediaResponse = {
        photos,
        videoTour,
        documents
      };

      // Different message based on whether propertyId was provided
      const message = propertyId 
        ? 'Media uploaded successfully, but not saved to property (property not found)'
        : 'Media uploaded successfully';

      return res.status(200).json({
        success: true,
        message,
        data: {
          media: mediaResponse
        }
      });
    }
  } catch (error) {
    console.error('Error in property media upload route:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process media upload'
    });
  }
});

/**
 * Route to delete a media item from a property
 */
router.delete('/:propertyType/:propertyId/:mediaUrl(*)', async (req, res) => {
  try {
    const { propertyType, propertyId, mediaUrl } = req.params;

    if (!propertyId || !mediaUrl) {
      return res.status(400).json({ success: false, error: 'Property ID and Media URL are required' });
    }

    if (!propertyType || !propertyModels[propertyType]) {
      return res.status(400).json({ success: false, error: 'Valid property type is required' });
    }

    // Get the model for this property type
    const PropertyModel = propertyModels[propertyType];

    // Find the property
    const property = await PropertyModel.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Check if media exists
    if (!property.media) {
      return res.status(404).json({ success: false, error: 'No media found for this property' });
    }

    // Decode the URL to handle special characters
    const decodedUrl = decodeURIComponent(mediaUrl);

    // Remove from photos if present
    let mediaRemoved = false;
    if (property.media.photos) {
      Object.keys(property.media.photos).forEach(category => {
        if (property.media.photos[category].includes(decodedUrl)) {
          property.media.photos[category] = property.media.photos[category].filter((url: string) => url !== decodedUrl);
          mediaRemoved = true;
        }
      });
    }

    // Remove from videoTour if it matches
    if (property.media.videoTour === decodedUrl) {
      property.media.videoTour = ''; // Use empty string instead of undefined
      property.markModified('media.videoTour'); // Explicitly mark as modified
      mediaRemoved = true;
    }

    // Remove from documents if present
    if (property.media.documents && property.media.documents.includes(decodedUrl)) {
      property.media.documents = property.media.documents.filter((url: string) => url !== decodedUrl);
      mediaRemoved = true;
    }

    if (!mediaRemoved) {
      return res.status(404).json({ success: false, error: 'Media item not found' });
    }

    // Save the updated property
    await property.save();

    return res.status(200).json({
      success: true,
      data: {
        message: 'Media item deleted successfully'
      }
    });
  } catch (error) {
    console.error('Error in property media delete route:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete media item'
    });
  }
});

/**
 * Route to get all media for a property
 */
router.get('/:propertyType/:propertyId', async (req, res) => {
  try {
    const { propertyType, propertyId } = req.params;

    if (!propertyId) {
      return res.status(400).json({ success: false, error: 'Property ID is required' });
    }

    if (!propertyType || !propertyModels[propertyType]) {
      return res.status(400).json({ success: false, error: 'Valid property type is required' });
    }

    // Get the model for this property type
    const PropertyModel = propertyModels[propertyType];

    // Find the property
    const property = await PropertyModel.findOne({ propertyId }, 'media');
    
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Return the media data
    return res.status(200).json({
      success: true,
      data: property.media || { photos: {}, videoTour: undefined, documents: [] }
    });
  } catch (error) {
    console.error('Error in property media get route:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to retrieve media'
    });
  }
});

/**
 * Route to get media information for a property
 */
router.get('/info/:propertyId/:propertyType', async (req, res) => {
  try {
    const { propertyId, propertyType } = req.params;

    if (!propertyId || !propertyType) {
      return res.status(400).json({ success: false, error: 'Property ID and type are required' });
    }

    // Get the model for this property type
    if (!propertyModels[propertyType]) {
      return res.status(400).json({ success: false, error: 'Invalid property type' });
    }

    const PropertyModel = propertyModels[propertyType];
    
    // Find the property
    const property = await PropertyModel.findOne({ propertyId });
    
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }

    // Return the media information
    return res.status(200).json({
      success: true,
      data: {
        media: property.media,
        videoTour: property.media.videoTour, // Explicitly include videoTour for debugging
        hasVideo: !!property.media.videoTour
      }
    });
  } catch (error) {
    console.error('Error getting property media info:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get property media info'
    });
  }
});

export default router;
