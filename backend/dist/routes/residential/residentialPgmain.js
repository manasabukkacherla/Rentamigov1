"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const residentialPgmainController_1 = require("../../controllers/residential/residentialPgmainController");
const pgMediaUploader_1 = require("../../middleware/pgMediaUploader");
const Pgmain_1 = __importDefault(require("../../models/residential/Pgmain"));
const router = express_1.default.Router();
// Create new PG listing
router.post('/', residentialPgmainController_1.createPg);
router.patch('/:propertyId', residentialPgmainController_1.updatePgMain);
// Get all PG listings
router.get('/', residentialPgmainController_1.getAllPgs);
// Get PG by Property ID
router.get('/:propertyId', residentialPgmainController_1.getPgByPropertyId);
// Update PG by ID
// Delete PG by ID
// Fix this to match the controller
router.delete('/:propertyId', residentialPgmainController_1.deletePgMain);
/**
 * Route to upload media files to S3 and save to MongoDB
 */
router.post('/media/upload', pgMediaUploader_1.pgMediaUpload, pgMediaUploader_1.processAndUploadPgMedia, async (req, res) => {
    try {
        const { propertyId } = req.body;
        const mediaItems = req.mediaItems;
        const videoCount = req.body.mediaData ?
            JSON.parse(req.body.mediaData).filter((item) => item.type === 'video').length : 0;
        // PropertyId is now optional - we'll continue even without it
        // Log whether we have a propertyId for debugging
        console.log(`Media upload request: ${propertyId ? 'Has propertyId' : 'No propertyId provided'}`);
        if (!mediaItems || !Array.isArray(mediaItems) || mediaItems.length === 0) {
            return res.status(400).json({ success: false, error: 'No media items were processed' });
        }
        // Log information about the upload for monitoring
        console.log(`Processing ${mediaItems.length} media items (${videoCount} videos)${propertyId ? ` for property ${propertyId}` : ' without propertyId'}`);
        // Only try to find the PG property if propertyId is provided
        let pgProperty;
        if (propertyId) {
            pgProperty = await Pgmain_1.default.findOne({ propertyId });
            if (!pgProperty) {
                console.warn(`PG property not found with ID: ${propertyId}. Media will be uploaded but not linked to a property.`);
            }
        }
        // Only try to update the PG property if it was found
        if (pgProperty) {
            // Initialize media structure if it doesn't exist
            if (!pgProperty.media) {
                pgProperty.media = { photos: [], videos: [], mediaItems: [] };
            }
            else {
                // Ensure all required arrays exist
                if (!pgProperty.media.mediaItems)
                    pgProperty.media.mediaItems = [];
                if (!pgProperty.media.photos)
                    pgProperty.media.photos = [];
                if (!pgProperty.media.videos)
                    pgProperty.media.videos = [];
            }
        }
        // Create a response object to store uploaded media URLs
        const uploadedMediaUrls = mediaItems && mediaItems.length > 0 ? mediaItems.map((item) => item.url) : [];
        // Add the new media items to pgProperty if it exists
        if (pgProperty && mediaItems && mediaItems.length > 0 && Array.isArray(mediaItems)) {
            // Ensure mediaItems is an array before spreading
            const existingMediaItems = Array.isArray(pgProperty.media.mediaItems) ? pgProperty.media.mediaItems : [];
            pgProperty.media.mediaItems = [...existingMediaItems, ...mediaItems];
            await pgProperty.save();
            // Log success for monitoring
            console.log(`Successfully saved ${mediaItems.length} media items to property ${propertyId}`);
        }
        else if (mediaItems && mediaItems.length > 0) {
            // If no pgProperty but we have media items, just log it
            console.log(`Uploaded ${mediaItems.length} media items without linking to a property`);
        }
        // Also update the legacy photos and videos arrays for backward compatibility
        const photos = mediaItems && mediaItems.length > 0 && Array.isArray(mediaItems) ?
            mediaItems.filter((item) => item.type === 'photo').map((item) => item.url) : [];
        const videos = mediaItems && mediaItems.length > 0 && Array.isArray(mediaItems) ?
            mediaItems.filter((item) => item.type === 'video').map((item) => item.url) : [];
        // Only update the pgProperty if it exists
        if (pgProperty) {
            if (!pgProperty.media.photos) {
                pgProperty.media.photos = [];
            }
            if (!pgProperty.media.videos) {
                pgProperty.media.videos = [];
            }
            if (Array.isArray(pgProperty.media.photos) && Array.isArray(photos)) {
                pgProperty.media.photos = [...pgProperty.media.photos, ...photos];
            }
            if (Array.isArray(pgProperty.media.videos) && Array.isArray(videos)) {
                pgProperty.media.videos = [...pgProperty.media.videos, ...videos];
            }
            // Save the updated property
            await pgProperty.save();
        }
        return res.status(200).json({
            success: true,
            data: {
                mediaItems: mediaItems,
                mediaUrls: uploadedMediaUrls,
                message: `Successfully uploaded ${mediaItems.length} media files`
            }
        });
    }
    catch (error) {
        console.error('Error in PG media upload route:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process media upload'
        });
    }
});
/**
 * Route to delete a media item from a PG property
 */
router.delete('/media/:propertyId/:mediaId', async (req, res) => {
    try {
        const { propertyId, mediaId } = req.params;
        if (!propertyId || !mediaId) {
            return res.status(400).json({ success: false, error: 'Property ID and Media ID are required' });
        }
        // Find the PG property
        const pgProperty = await Pgmain_1.default.findOne({ propertyId });
        if (!pgProperty) {
            return res.status(404).json({ success: false, error: 'PG property not found' });
        }
        // Check if media exists
        if (!pgProperty.media || !pgProperty.media.mediaItems) {
            return res.status(404).json({ success: false, error: 'No media found for this property' });
        }
        // Find the media item to delete
        const mediaItem = pgProperty.media.mediaItems.find(item => item.id === mediaId);
        if (!mediaItem) {
            return res.status(404).json({ success: false, error: 'Media item not found' });
        }
        // Remove the media item from mediaItems array
        pgProperty.media.mediaItems = pgProperty.media.mediaItems.filter(item => item.id !== mediaId);
        // Also remove from legacy photos or videos array if present
        if (mediaItem.type === 'photo' && pgProperty.media.photos) {
            pgProperty.media.photos = pgProperty.media.photos.filter(url => url !== mediaItem.url);
        }
        else if (mediaItem.type === 'video' && pgProperty.media.videos) {
            pgProperty.media.videos = pgProperty.media.videos.filter(url => url !== mediaItem.url);
        }
        // Save the updated property
        await pgProperty.save();
        return res.status(200).json({
            success: true,
            data: {
                message: 'Media item deleted successfully'
            }
        });
    }
    catch (error) {
        console.error('Error in PG media delete route:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete media item'
        });
    }
});
/**
 * Route to get all media for a PG property
 */
router.get('/media/:propertyId', async (req, res) => {
    try {
        const { propertyId } = req.params;
        if (!propertyId) {
            return res.status(400).json({ success: false, error: 'Property ID is required' });
        }
        // Find the PG property
        const pgProperty = await Pgmain_1.default.findOne({ propertyId }, 'media');
        if (!pgProperty) {
            return res.status(404).json({ success: false, error: 'PG property not found' });
        }
        // Return the media data
        return res.status(200).json({
            success: true,
            data: pgProperty.media || { photos: [], videos: [], mediaItems: [] }
        });
    }
    catch (error) {
        console.error('Error in PG media get route:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to retrieve media'
        });
    }
});
exports.default = router;
