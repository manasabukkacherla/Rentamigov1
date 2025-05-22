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

    // Define an interface for detailed photo information
    interface IPhotoDetail {
      id: string;
      url: string;
      title: string;
      category: string;
      tags?: string[];
    }

    // Group media items by category and type
    const photos: { [category: string]: IPhotoDetail[] } = {};
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
        // Store the detailed photo object instead of just the URL
        const photoDetail: IPhotoDetail = {
          id: item.id, // Assuming item has an id, title, tags
          url: item.url,
          title: item.title || 'Untitled',
          category: item.category,
          tags: item.tags || []
        };
        photos[item.category].push(photoDetail);
        console.log(`Added photo to category ${item.category}:`, photoDetail);
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
      const updateOperations: any = { $set: {}, $push: {} };
      let hasMediaChangesToPersist = false;

      // Ensure property.media and its sub-fields are initialized if they don't exist
      // This is important for the logic that merges new data with existing data.
      if (!property.media) {
        property.media = { photos: {}, documents: [], videoTour: '' }; // Default structure
      }
      if (!property.media.photos) {
        property.media.photos = {};
      }
      if (!property.media.documents) {
        property.media.documents = [];
      }
      // property.media.videoTour can be undefined initially, handled below.

      // --- Prepare Photos for Update ---
      if (Object.keys(photos).length > 0) {
        const currentDbPhotos = property.media.photos || {};
        const newPhotosData = { ...currentDbPhotos };
        let photosChanged = false;

        Object.entries(photos).forEach(([category, newPhotoItems]) => {
          const existingCategoryItems = newPhotosData[category] || [];
          // Combine and deduplicate photo items based on their 'id'
          const combinedItems = [...existingCategoryItems, ...newPhotoItems];
          const uniquePhotoItems = Array.from(new Map(combinedItems.map(item => [item.id, item])).values());
          
          // Check if this category's photo list actually changed
          // Comparing stringified versions is a common way, ensure consistent object key order or use a deep equal library for more robustness
          if (JSON.stringify(uniquePhotoItems) !== JSON.stringify(existingCategoryItems)) {
            newPhotosData[category] = uniquePhotoItems;
            photosChanged = true;
          }
        });

        if (photosChanged) {
          updateOperations.$set['media.photos'] = newPhotosData;
          hasMediaChangesToPersist = true;
          console.log('Prepared photos for update:', newPhotosData);
        }
      }

      // --- Prepare videoTour for Update ---
      // `videoTour` is the URL from the current upload batch, or `''` if no video was in mediaItems.
      // `property.media.videoTour` is the value currently in the database.
      if (videoTour) { // A video URL was processed in this upload batch
        if (videoTour !== property.media.videoTour) {
          updateOperations.$set['media.videoTour'] = videoTour;
          hasMediaChangesToPersist = true;
          console.log('Prepared videoTour for update (new/changed):', videoTour);
        }
      } else { // No video was processed in this batch (so `videoTour` is `''`)
        if (property.media.videoTour === undefined) { // And no videoTour field exists on the record yet
          updateOperations.$set['media.videoTour'] = ''; // Initialize to empty string
          hasMediaChangesToPersist = true;
          console.log('Initialized videoTour field to empty string as it was undefined.');
        }
        // If `videoTour` is `''` (no new video) and `property.media.videoTour` already exists (e.g., as a URL or `''`), do nothing to it.
      }

      // --- Prepare Documents for Update ---
      if (documents.length > 0) {
        updateOperations.$push['media.documents'] = { $each: documents };
        hasMediaChangesToPersist = true;
        console.log('Prepared documents for update (pushing):', documents);
      }
      
      // Clean up empty $set or $push from updateOperations to avoid empty update objects
      if (Object.keys(updateOperations.$set).length === 0) {
        delete updateOperations.$set;
      }
      if (Object.keys(updateOperations.$push).length === 0) {
        delete updateOperations.$push;
      }

      // --- Perform Database Update ---
      if (hasMediaChangesToPersist && (updateOperations.$set || updateOperations.$push)) {
        try {
          console.log('Attempting direct DB update with operations:', JSON.stringify(updateOperations));
          const updateResult = await propertyModels[propertyType].updateOne(
            { propertyId },
            updateOperations
          );
          console.log('Direct DB update result:', updateResult);

          if (updateResult.modifiedCount > 0 || (updateResult.matchedCount > 0 && !updateResult.modifiedCount)) {
            // modifiedCount > 0 means changes were made.
            // matchedCount > 0 && modifiedCount === 0 means the document was found but data was identical to what was being set.
            console.log(`Property media ${updateResult.modifiedCount > 0 ? 'updated' : 'already up-to-date'} successfully via updateOne.`);

            // Fetch the updated property to return its media and for verification
            const updatedPropertyAfterSave = await propertyModels[propertyType].findOne({ propertyId });
            
            if (updatedPropertyAfterSave) {
                console.log('Verification - media after updateOne:', updatedPropertyAfterSave.media);
            }
            
            return res.status(200).json({
              success: true,
              message: 'Media uploaded successfully and saved to property',
              data: {
                media: updatedPropertyAfterSave?.media // Return the potentially updated media
              }
            });
          } else {
            // This case (e.g., matchedCount = 0) should ideally not be hit if property was found earlier.
            console.warn('updateOne operation did not find or modify the document. PropertyId:', propertyId);
            return res.status(200).json({
              success: true, // Media was uploaded to S3, but DB link might have issues
              message: 'Media uploaded. However, property data in DB was not found or not changed by this operation.',
              data: {
                media: property.media // Return original media as DB interaction was not conclusive for update
              }
            });
          }
        } catch (dbError) {
          console.error('Error updating property media with updateOne:', dbError);
          return res.status(500).json({
            success: false,
            error: dbError instanceof Error ? dbError.message : 'Failed to save media to property'
          });
        }
      } else {
        // No actual changes to persist to the database for this property's media
        console.log('No new or changed media content to persist to the database for this property.');
        return res.status(200).json({
          success: true,
          message: 'Media uploaded successfully. No changes made to property media data as content was identical or not provided for update.',
          data: {
            media: property.media // Return existing media as no changes were made
          }
        });
      }
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
