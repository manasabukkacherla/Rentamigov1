"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const propertyMediaUploader_1 = require("../middleware/propertyMediaUploader");
const mongoose_1 = __importDefault(require("mongoose"));
// Import all residential models
const residentialRentApartment_1 = __importDefault(require("../models/residential/residentialRentApartment"));
const residentialRentBuilderFloor_1 = __importDefault(require("../models/residential/residentialRentBuilderFloor"));
const residentialRentIndependent_1 = __importDefault(require("../models/residential/residentialRentIndependent"));
const residentialSaleApartment_1 = __importDefault(require("../models/residential/residentialSaleApartment"));
const residentialSaleBuilderFloor_1 = __importDefault(require("../models/residential/residentialSaleBuilderFloor"));
const saleIndependentHouse_1 = __importDefault(require("../models/residential/saleIndependentHouse"));
const residentialLeaseAppartment_1 = __importDefault(require("../models/residential/residentialLeaseAppartment"));
const residentialLeaseBuilderFloor_1 = __importDefault(require("../models/residential/residentialLeaseBuilderFloor"));
const residentialLeaseIndependentHouse_1 = __importDefault(require("../models/residential/residentialLeaseIndependentHouse"));
const salePlot_1 = __importDefault(require("../models/residential/salePlot"));
// Import all commercial models
const CommercialRentRetailStore_1 = __importDefault(require("../models/commercial/CommercialRentRetailStore"));
const commercialRentPlot_1 = __importDefault(require("../models/commercial/commercialRentPlot"));
const CommercialRentShed_1 = __importDefault(require("../models/commercial/CommercialRentShed"));
const CommercialRentOthers_1 = __importDefault(require("../models/commercial/CommercialRentOthers"));
const router = express_1.default.Router();
// Map property types to their respective models
const propertyModels = {
    // Residential Rent
    'apartment': residentialRentApartment_1.default,
    'builderFloor': residentialRentBuilderFloor_1.default,
    'independentHouse': residentialRentIndependent_1.default,
    // Residential Sale
    'saleApartment': residentialSaleApartment_1.default,
    'saleBuilderFloor': residentialSaleBuilderFloor_1.default,
    'saleIndependentHouse': saleIndependentHouse_1.default,
    'salePlot': salePlot_1.default,
    // Residential Lease
    'leaseApartment': residentialLeaseAppartment_1.default,
    'leaseBuilderFloor': residentialLeaseBuilderFloor_1.default,
    'leaseIndependentHouse': residentialLeaseIndependentHouse_1.default,
    // Commercial
    'commercialRentRetail': CommercialRentRetailStore_1.default,
    'commercialRentPlot': commercialRentPlot_1.default,
    'commercialRentShed': CommercialRentShed_1.default,
    'commercialRentOthers': CommercialRentOthers_1.default,
    // Add more property types as needed
};
/**
 * Route to upload media files to S3 and save to MongoDB
 */
router.post('/upload', propertyMediaUploader_1.propertyMediaUpload, propertyMediaUploader_1.processAndUploadPropertyMedia, async (req, res) => {
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
        console.log(`Upload route handling ${mediaItems.length} items for ${propertyType}${propertyId ? ` with ID ${propertyId}` : ''}`);
        console.log('Media items:', JSON.stringify(mediaItems.slice(0, 2), null, 2)); // Log sample of media items
        // Group media items by category and type
        const photos = {};
        const documents = [];
        let videoTour = ''; // Initialize as empty string instead of null
        // Property is optional - we'll only try to find it if a propertyId is provided
        let property;
        let propertyFound = false;
        if (propertyId) {
            // Get the model for this property type
            if (!propertyModels[propertyType]) {
                // Just log the error but continue with the upload
                console.warn(`Invalid property type: ${propertyType}. Media will be uploaded but not linked to a property.`);
            }
            else {
                const PropertyModel = propertyModels[propertyType];
                try {
                    // Find the property
                    property = await PropertyModel.findOne({ propertyId });
                    if (property) {
                        propertyFound = true;
                        // Initialize media structure if it doesn't exist
                        if (!property.media) {
                            property.media = { photos: {}, documents: [], videoTour: '', mediaItems: [] };
                        }
                        // Ensure photos object exists
                        if (!property.media.photos) {
                            property.media.photos = {};
                        }
                        // Ensure documents array exists
                        if (!property.media.documents) {
                            property.media.documents = [];
                        }
                        // Ensure mediaItems array exists
                        if (!property.media.mediaItems) {
                            property.media.mediaItems = [];
                            console.log('Initializing empty mediaItems array on existing property');
                        }
                    }
                    else {
                        console.warn(`Property not found with ID: ${propertyId}. Media will be uploaded but not linked to a property.`);
                    }
                }
                catch (findError) {
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
                const photoDetail = {
                    id: item.id, // Assuming item has an id, title, tags
                    url: item.url,
                    title: item.title || 'Untitled',
                    category: item.category,
                    tags: item.tags || []
                };
                photos[item.category].push(photoDetail);
                console.log(`Added photo to category ${item.category}:`, photoDetail);
            }
            else if (item.type === 'video') {
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
                }
                else {
                    console.log('✅ VALID VIDEO URL CONFIRMED');
                    console.log('Type:', typeof item.url);
                    console.log('Length:', item.url.length);
                    console.log('Will be saved to database as videoTour field');
                }
            }
            else if (item.type === 'document') {
                documents.push(item.url);
                console.log('Document uploaded successfully:', item.url);
            }
        });
        // Final check for video URL
        if (videoTour) {
            console.log('Final videoTour URL before saving:', videoTour);
        }
        else {
            console.log('No videoTour URL found in processed media items');
        }
        // DIRECT UPDATE - Always update mediaItems array regardless of property found status
        if (propertyId) {
            try {
                console.log('ATTEMPTING DIRECT mediaItems UPDATE');
                // First make sure propertyId exists in the database
                const PropertyModel = propertyModels[propertyType];
                if (PropertyModel) {
                    // First ensure the media structure exists
                    await PropertyModel.updateOne({ propertyId, 'media': { $exists: false } }, { $set: { 'media': { photos: {}, documents: [], videoTour: '', mediaItems: [] } } }, { upsert: true });
                    // Then ensure mediaItems exists
                    await PropertyModel.updateOne({ propertyId, 'media.mediaItems': { $exists: false } }, { $set: { 'media.mediaItems': [] } });
                    // Make sure all media items have the required fields 
                    const validatedMediaItems = mediaItems.map(item => ({
                        id: item.id || new mongoose_1.default.Types.ObjectId().toString(),
                        type: item.type || 'photo',
                        url: item.url,
                        title: item.title || 'Untitled',
                        category: item.category || 'other',
                        tags: item.tags || [],
                        roomType: item.roomType || ''
                    }));
                    // Now add all mediaItems directly using the reliable approach for ALL property types
                    if (validatedMediaItems && validatedMediaItems.length > 0) {
                        console.log(`Adding ${validatedMediaItems.length} items to mediaItems array`);
                        // First use findOne to get the current state
                        const currentProperty = await PropertyModel.findOne({ propertyId });
                        console.log('Current property media status:', {
                            hasMedia: !!currentProperty?.media,
                            hasMediaItems: !!currentProperty?.media?.mediaItems,
                            mediaItemsCount: currentProperty?.media?.mediaItems?.length || 0
                        });
                        // Use direct MongoDB operations for all property types, not just apartments
                        console.log('USING DIRECT MONGO OPERATIONS');
                        // Force create mediaItems array if it doesn't exist or is invalid
                        await PropertyModel.updateOne({ propertyId }, { $set: { 'media.mediaItems': currentProperty?.media?.mediaItems || [] } });
                        // Add each media item individually to avoid array issues
                        for (const item of validatedMediaItems) {
                            console.log(`Directly adding item to mediaItems: ${item.id} (${item.type}) - category: ${item.category}`);
                            await PropertyModel.updateOne({ propertyId }, { $push: { 'media.mediaItems': item } });
                        }
                        // Verify the update
                        const updatedAfterDirectPush = await PropertyModel.findOne({ propertyId });
                        console.log('Updated mediaItems count after direct operations:', updatedAfterDirectPush?.media?.mediaItems?.length || 0);
                        // If category-specific photo arrays need updating, do that too
                        for (const [category, items] of Object.entries(photos)) {
                            if (Array.isArray(items) && items.length > 0) {
                                console.log(`Updating ${items.length} photos for category ${category}`);
                                // For apartment type which uses object arrays
                                if (propertyType === 'apartment') {
                                    await PropertyModel.updateOne({ propertyId }, { $push: { [`media.photos.${category}`]: { $each: items } } });
                                }
                                // For other property types that use string URL arrays
                                else {
                                    const photoUrls = items.map(item => item.url);
                                    await PropertyModel.updateOne({ propertyId }, { $push: { [`media.photos.${category}`]: { $each: photoUrls } } });
                                }
                            }
                        }
                        // Update videoTour if present
                        if (videoTour) {
                            await PropertyModel.updateOne({ propertyId }, { $set: { 'media.videoTour': videoTour } });
                        }
                        // Check if the update worked
                        const updatedProperty = await PropertyModel.findOne({ propertyId });
                        if (updatedProperty && updatedProperty.media && updatedProperty.media.mediaItems) {
                            console.log(`mediaItems after update: ${updatedProperty.media.mediaItems.length} items`);
                            console.log('Sample mediaItem:', JSON.stringify(updatedProperty.media.mediaItems[0] || {}, null, 2));
                        }
                        else {
                            console.error('Failed to find updated property or mediaItems array is missing');
                            console.log('Updated property:', updatedProperty);
                            // Last attempt to fix media structure if it's still missing
                            await PropertyModel.updateOne({ propertyId }, { $set: { 'media.mediaItems': validatedMediaItems || [] } }, { upsert: true });
                            // Verify again
                            const reCheckedProperty = await PropertyModel.findOne({ propertyId });
                            console.log('After final fix attempt - mediaItems exists:', !!reCheckedProperty?.media?.mediaItems, 'count:', reCheckedProperty?.media?.mediaItems?.length || 0);
                        }
                    }
                }
            }
            catch (error) {
                console.error('Error directly updating mediaItems:', error);
            }
        }
        // If propertyId is provided and property was found, update the property document
        if (propertyId && propertyFound && property) {
            const updateOperations = { $set: {}, $push: {} };
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
                // Handle different photo storage formats based on property type
                Object.entries(photos).forEach(([category, newPhotoItems]) => {
                    // Check if this category exists in the schema
                    if (!newPhotosData[category]) {
                        newPhotosData[category] = [];
                    }
                    // For all property types, store URLs directly
                    const newUrls = newPhotoItems.map(item => item.url);
                    // Add new URLs to the category array
                    newPhotosData[category] = [...(newPhotosData[category] || []), ...newUrls];
                    photosChanged = true;
                    console.log(`Updated ${category} photos - added ${newUrls.length} new items`);
                });
                // Log the full update operation for debugging
                console.log('FULL MEDIA UPDATE:', JSON.stringify(newPhotosData, null, 2));
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
            }
            else { // No video was processed in this batch (so `videoTour` is `''`)
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
            // --- Perform Database Update ---
            if (hasMediaChangesToPersist && (updateOperations.$set || updateOperations.$push)) {
                try {
                    console.log('ATTEMPTING DATABASE UPDATE');
                    console.log('Property ID:', propertyId);
                    console.log('Property Type:', propertyType);
                    console.log('Update Operations:', JSON.stringify(updateOperations, null, 2));
                    // Process photos for category-specific arrays
                    if (updateOperations.$set && updateOperations.$set['media.photos']) {
                        const photoUpdates = updateOperations.$set['media.photos'];
                        console.log('Photo updates to be applied:', JSON.stringify(photoUpdates, null, 2));
                        // Check if we have photos to update
                        if (Object.keys(photoUpdates).length > 0) {
                            // Create a direct update operation for each category that has photos
                            const photoUpdatePromises = Object.entries(photoUpdates).map(async ([category, items]) => {
                                if (Array.isArray(items) && items.length > 0) {
                                    // Create an update command for this category
                                    console.log(`Updating ${items.length} photos for category ${category}`);
                                    try {
                                        // Use $push to append each photo to the array
                                        const categoryUpdateResult = await propertyModels[propertyType].updateOne({ propertyId }, { $push: { [`media.photos.${category}`]: { $each: items } } });
                                        console.log(`Update result for ${category}:`, categoryUpdateResult);
                                        return categoryUpdateResult;
                                    }
                                    catch (categoryError) {
                                        console.error(`Error updating ${category} photos:`, categoryError);
                                        return null;
                                    }
                                }
                                return null;
                            });
                            // Wait for all photo category updates to complete
                            const photoResults = await Promise.all(photoUpdatePromises.filter(p => p !== null));
                            console.log('All photo update results:', photoResults);
                        }
                    }
                    // Also ensure all media items are stored in the mediaItems array
                    const allMediaItems = [...mediaItems];
                    if (allMediaItems.length > 0) {
                        try {
                            console.log('Storing all media items in mediaItems array:', allMediaItems.length, 'items');
                            // First ensure the mediaItems array exists (initialize if needed)
                            await propertyModels[propertyType].updateOne({ propertyId, 'media.mediaItems': { $exists: false } }, { $set: { 'media.mediaItems': [] } }, { upsert: true });
                            // Then add the items
                            await propertyModels[propertyType].updateOne({ propertyId }, { $push: { 'media.mediaItems': { $each: allMediaItems } } });
                            console.log('Successfully pushed items to mediaItems array');
                        }
                        catch (mediaItemsError) {
                            console.error('Error updating mediaItems array:', mediaItemsError);
                        }
                    }
                    // Update the video separately if needed
                    if (videoTour && videoTour !== property.media.videoTour) {
                        console.log('Updating video tour:', videoTour);
                        await propertyModels[propertyType].updateOne({ propertyId }, { $set: { 'media.videoTour': videoTour } });
                    }
                    // Check the result
                    const updatedProperty = await propertyModels[propertyType].findOne({ propertyId });
                    if (updatedProperty && updatedProperty.media) {
                        console.log('UPDATED PROPERTY MEDIA:');
                        // Log photos by category
                        if (updatedProperty.media.photos) {
                            console.log('PHOTOS BY CATEGORY:');
                            Object.entries(updatedProperty.media.photos).forEach(([category, photos]) => {
                                if (Array.isArray(photos) && photos.length > 0) {
                                    console.log(`${category}: ${photos.length} photos found`);
                                    console.log(`Sample: ${JSON.stringify(photos[0], null, 2)}`);
                                }
                            });
                        }
                        // Log all media items
                        if (updatedProperty.media.mediaItems) {
                            console.log('ALL MEDIA ITEMS:');
                            console.log(`Total: ${updatedProperty.media.mediaItems.length} items`);
                            if (updatedProperty.media.mediaItems.length > 0) {
                                console.log(`Sample: ${JSON.stringify(updatedProperty.media.mediaItems[0], null, 2)}`);
                            }
                        }
                        // Log video tour
                        if (updatedProperty.media.videoTour) {
                            console.log('Video tour URL:', updatedProperty.media.videoTour);
                        }
                        return res.status(200).json({
                            success: true,
                            message: 'Media uploaded successfully and saved to property',
                            data: {
                                media: updatedProperty.media
                            }
                        });
                    }
                }
                catch (dbError) {
                    console.error('Error updating property media:', dbError);
                    return res.status(500).json({
                        success: false,
                        error: dbError instanceof Error ? dbError.message : 'Failed to save media to property'
                    });
                }
            }
            else {
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
        }
        else {
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
    }
    catch (error) {
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
            // Handle deletion based on property type - apartments use objects, others use string URLs
            if (propertyType === 'apartment') {
                // For apartments, we need to find and filter objects with matching URLs
                Object.keys(property.media.photos).forEach(category => {
                    if (Array.isArray(property.media.photos[category])) {
                        const originalLength = property.media.photos[category].length;
                        // Filter out the media item with the matching URL
                        property.media.photos[category] = property.media.photos[category].filter((item) => item && item.url !== decodedUrl);
                        // Check if anything was removed
                        if (property.media.photos[category].length < originalLength) {
                            mediaRemoved = true;
                            console.log(`Removed photo with URL ${decodedUrl} from ${category}`);
                        }
                    }
                });
            }
            else {
                // For other property types that use simple URL arrays
                Object.keys(property.media.photos).forEach(category => {
                    if (property.media.photos[category].includes(decodedUrl)) {
                        property.media.photos[category] = property.media.photos[category].filter((url) => url !== decodedUrl);
                        mediaRemoved = true;
                    }
                });
            }
        }
        // Remove from videoTour if it matches
        if (property.media.videoTour === decodedUrl) {
            property.media.videoTour = ''; // Use empty string instead of undefined
            property.markModified('media.videoTour'); // Explicitly mark as modified
            mediaRemoved = true;
        }
        // Remove from documents if present
        if (property.media.documents && property.media.documents.includes(decodedUrl)) {
            property.media.documents = property.media.documents.filter((url) => url !== decodedUrl);
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
    }
    catch (error) {
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
    }
    catch (error) {
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
    }
    catch (error) {
        console.error('Error getting property media info:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get property media info'
        });
    }
});
/**
 * Debug route to check media structure for a property
 */
router.get('/debug/:propertyType/:propertyId', async (req, res) => {
    try {
        const { propertyType, propertyId } = req.params;
        if (!propertyId || !propertyType) {
            return res.status(400).json({ success: false, error: 'Property ID and type are required' });
        }
        // Get the model for this property type
        if (!propertyModels[propertyType]) {
            return res.status(400).json({ success: false, error: 'Invalid property type' });
        }
        // Log property media structure
        await logPropertyMediaStructure(propertyType, propertyId);
        // Check if mediaItems array exists
        const hasMediaItems = await ensureMediaItemsExists(propertyType, propertyId);
        const PropertyModel = propertyModels[propertyType];
        const property = await PropertyModel.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({ success: false, error: 'Property not found' });
        }
        return res.status(200).json({
            success: true,
            message: 'Property media structure checked',
            data: {
                hasMediaItems,
                mediaItemsCount: property?.media?.mediaItems?.length || 0,
                media: property?.media || null
            }
        });
    }
    catch (error) {
        console.error('Error in debug route:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to check property media'
        });
    }
});
/**
 * Route to repair mediaItems for a property
 */
router.post('/repair/:propertyType/:propertyId', async (req, res) => {
    try {
        const { propertyType, propertyId } = req.params;
        if (!propertyId || !propertyType) {
            return res.status(400).json({ success: false, error: 'Property ID and type are required' });
        }
        // Get the model for this property type
        if (!propertyModels[propertyType]) {
            return res.status(400).json({ success: false, error: 'Invalid property type' });
        }
        // Log initial media structure
        console.log('BEFORE REPAIR:');
        await logPropertyMediaStructure(propertyType, propertyId);
        // First ensure mediaItems array exists
        await ensureMediaItemsExists(propertyType, propertyId);
        // Then repair mediaItems by populating from category arrays
        const repaired = await repairMediaItemsFromCategories(propertyType, propertyId);
        // Log after repair
        console.log('AFTER REPAIR:');
        await logPropertyMediaStructure(propertyType, propertyId);
        const PropertyModel = propertyModels[propertyType];
        const property = await PropertyModel.findOne({ propertyId });
        return res.status(200).json({
            success: true,
            message: 'Media items repaired successfully',
            data: {
                mediaItemsCount: property?.media?.mediaItems?.length || 0
            }
        });
    }
    catch (error) {
        console.error('Error in repair route:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to repair property media'
        });
    }
});
/**
 * Direct fix for a specific property ID
 */
router.post('/direct-fix/:propertyId', async (req, res) => {
    try {
        const { propertyId } = req.params;
        const propertyType = 'apartment'; // Force apartment type for specific fix
        console.log(`Performing direct fix for property: ${propertyId}`);
        if (!propertyId) {
            return res.status(400).json({ success: false, error: 'Property ID is required' });
        }
        const PropertyModel = propertyModels[propertyType];
        const property = await PropertyModel.findOne({ propertyId });
        if (!property) {
            return res.status(404).json({ success: false, error: 'Property not found' });
        }
        // Log initial state
        console.log('============ BEFORE FIX ============');
        await logPropertyMediaStructure(propertyType, propertyId);
        // Force create clean mediaItems array
        await PropertyModel.updateOne({ propertyId }, { $set: { 'media.mediaItems': [] } });
        // Build a fresh mediaItems array from existing media
        const newMediaItems = [];
        // Process each category of photos
        if (property.media && property.media.photos) {
            Object.entries(property.media.photos).forEach(([category, items]) => {
                if (Array.isArray(items) && items.length > 0) {
                    items.forEach((item) => {
                        if (item) {
                            // For detailed photo objects (apartment type)
                            if (typeof item === 'object' && item.url) {
                                newMediaItems.push({
                                    id: item.id || new mongoose_1.default.Types.ObjectId().toString(),
                                    type: 'photo',
                                    url: item.url,
                                    title: item.title || 'Untitled',
                                    category: category,
                                    tags: item.tags || []
                                });
                                console.log(`Added photo from ${category}: ${item.url}`);
                            }
                            // For string URLs (other property types)
                            else if (typeof item === 'string') {
                                newMediaItems.push({
                                    id: new mongoose_1.default.Types.ObjectId().toString(),
                                    type: 'photo',
                                    url: item,
                                    title: 'Untitled',
                                    category: category,
                                    tags: []
                                });
                                console.log(`Added photo from ${category}: ${item}`);
                            }
                        }
                    });
                }
            });
        }
        // Add video if exists
        if (property.media && property.media.videoTour) {
            newMediaItems.push({
                id: new mongoose_1.default.Types.ObjectId().toString(),
                type: 'video',
                url: property.media.videoTour,
                title: 'Video Tour',
                category: 'videoTour',
                tags: []
            });
            console.log(`Added video: ${property.media.videoTour}`);
        }
        // Add documents if exist
        if (property.media && Array.isArray(property.media.documents)) {
            property.media.documents.forEach((docUrl) => {
                if (docUrl) {
                    newMediaItems.push({
                        id: new mongoose_1.default.Types.ObjectId().toString(),
                        type: 'document',
                        url: docUrl,
                        title: 'Document',
                        category: 'document',
                        tags: []
                    });
                    console.log(`Added document: ${docUrl}`);
                }
            });
        }
        console.log(`Found ${newMediaItems.length} total media items to add`);
        // Update with new mediaItems if we found any
        if (newMediaItems.length > 0) {
            // First try using $set for full array replacement
            const updateResult = await PropertyModel.updateOne({ propertyId }, { $set: { 'media.mediaItems': newMediaItems } });
            console.log('Update result using $set:', updateResult);
            // If that didn't work, try adding each item individually
            if (updateResult.modifiedCount === 0) {
                console.log('First update attempt failed, trying individual pushes');
                for (const item of newMediaItems) {
                    await PropertyModel.updateOne({ propertyId }, { $push: { 'media.mediaItems': item } });
                    console.log(`Pushed item ${item.id} individually`);
                }
            }
        }
        else {
            console.log('No media items found to repair');
        }
        // Log final state
        console.log('============ AFTER FIX ============');
        await logPropertyMediaStructure(propertyType, propertyId);
        // Verify the update
        const updatedProperty = await PropertyModel.findOne({ propertyId });
        const mediaItemsCount = updatedProperty?.media?.mediaItems?.length || 0;
        return res.status(200).json({
            success: true,
            message: `Direct fix applied. MediaItems: ${mediaItemsCount}`,
            data: {
                mediaItemsCount,
                mediaItems: updatedProperty?.media?.mediaItems || []
            }
        });
    }
    catch (error) {
        console.error('Error in direct fix route:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to apply direct fix'
        });
    }
});
/**
 * Direct fix for specific problematic property (RA-RESREAP0006)
 */
router.get('/fix-property/:propertyId', async (req, res) => {
    try {
        const { propertyId } = req.params;
        const targetId = propertyId || "RA-RESREAP0006"; // Default to the known problematic ID
        const propertyType = "apartment";
        console.log(`Running direct fix for property ${targetId}`);
        // Get the property model
        const PropertyModel = propertyModels[propertyType];
        if (!PropertyModel) {
            return res.status(400).json({ success: false, error: 'Invalid property type' });
        }
        // Get the property
        const property = await PropertyModel.findOne({ propertyId: targetId });
        if (!property) {
            return res.status(404).json({ success: false, error: 'Property not found' });
        }
        console.log('Media before fix:', property.media);
        // Prepare update operations
        const fixedMediaItems = [];
        // Add photos from category-specific arrays
        if (property.media && property.media.photos) {
            for (const category in property.media.photos) {
                const photos = property.media.photos[category];
                if (Array.isArray(photos)) {
                    photos.forEach(photo => {
                        if (photo && photo.url) {
                            // For object-based photo items (apartment type)
                            fixedMediaItems.push({
                                id: photo.id || new mongoose_1.default.Types.ObjectId().toString(),
                                type: 'photo',
                                url: photo.url,
                                title: photo.title || 'Untitled',
                                category: category,
                                tags: photo.tags || []
                            });
                        }
                        else if (typeof photo === 'string') {
                            // For string-based photo URLs (other types)
                            fixedMediaItems.push({
                                id: new mongoose_1.default.Types.ObjectId().toString(),
                                type: 'photo',
                                url: photo,
                                title: 'Untitled',
                                category: category,
                                tags: []
                            });
                        }
                    });
                }
            }
        }
        // Add video tour if exists
        if (property.media && property.media.videoTour) {
            fixedMediaItems.push({
                id: new mongoose_1.default.Types.ObjectId().toString(),
                type: 'video',
                url: property.media.videoTour,
                title: 'Video Tour',
                category: 'videoTour',
                tags: []
            });
        }
        // Add documents if exist
        if (property.media && property.media.documents && Array.isArray(property.media.documents)) {
            property.media.documents.forEach((docUrl) => {
                if (docUrl) {
                    fixedMediaItems.push({
                        id: new mongoose_1.default.Types.ObjectId().toString(),
                        type: 'document',
                        url: docUrl,
                        title: 'Document',
                        category: 'document',
                        tags: []
                    });
                }
            });
        }
        // Update the property with fixed mediaItems
        if (fixedMediaItems.length > 0) {
            console.log(`Adding ${fixedMediaItems.length} items to mediaItems array`);
            const updateResult = await PropertyModel.updateOne({ propertyId: targetId }, { $set: { 'media.mediaItems': fixedMediaItems } });
            console.log('Update result:', updateResult);
            // Verify update
            const updatedProperty = await PropertyModel.findOne({ propertyId: targetId });
            const mediaItemsCount = updatedProperty?.media?.mediaItems?.length || 0;
            return res.status(200).json({
                success: true,
                message: `Fixed mediaItems for property ${targetId}. Added ${mediaItemsCount} items.`,
                data: {
                    mediaItemsCount,
                    mediaItems: updatedProperty?.media?.mediaItems
                }
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'No media items found to add',
                data: { mediaItemsCount: 0 }
            });
        }
    }
    catch (error) {
        console.error('Error fixing property:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fix property'
        });
    }
});
exports.default = router;
function logPropertyMediaStructure(propertyType, propertyId) {
    throw new Error('Function not implemented.');
}
function ensureMediaItemsExists(propertyType, propertyId) {
    throw new Error('Function not implemented.');
}
function repairMediaItemsFromCategories(propertyType, propertyId) {
    throw new Error('Function not implemented.');
}
