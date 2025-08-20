"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const residentialMediaUploader_1 = require("../middleware/residentialMediaUploader");
const router = express_1.default.Router();
// Route for uploading media files
router.post('/upload', residentialMediaUploader_1.residentialMediaUpload, residentialMediaUploader_1.processAndUploadResidentialMedia, (req, res) => {
    try {
        if (!req.mediaItems) {
            return res.status(400).json({
                success: false,
                error: 'No media items were processed'
            });
        }
        res.json({
            success: true,
            data: {
                mediaItems: req.mediaItems
            }
        });
    }
    catch (error) {
        console.error('Error in media upload route:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process media upload'
        });
    }
});
// Route for deleting media
router.delete('/:propertyType/:propertyId/:mediaId', async (req, res) => {
    try {
        const { propertyType, propertyId, mediaId } = req.params;
        // Here you would typically:
        // 1. Delete the file from S3
        // 2. Remove the media reference from the property in the database
        // 3. Return success response
        // For now, we'll just return success
        // TODO: Implement actual deletion logic
        res.json({
            success: true,
            message: 'Media deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting media:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete media'
        });
    }
});
// Route for fetching media
router.get('/:propertyType/:propertyId', async (req, res) => {
    try {
        const { propertyType, propertyId } = req.params;
        // Here you would typically:
        // 1. Fetch media references from the property in the database
        // 2. Return the media items with their S3 URLs
        // For now, we'll just return an empty array
        // TODO: Implement actual fetch logic
        res.json({
            success: true,
            data: []
        });
    }
    catch (error) {
        console.error('Error fetching media:', error);
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch media'
        });
    }
});
exports.default = router;
