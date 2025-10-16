"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAndUploadCommercialMedia = exports.uploadToS3 = exports.commercialMediaUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
// Configure S3 Client
const s3 = new client_s3_1.S3Client({
    region: process.env.AWS_REGION || '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: true,
});
// Configure multer for memory storage
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: 150 * 1024 * 1024, // 150MB limit for videos
        files: 20, // Maximum number of files
    },
    fileFilter: (req, file, cb) => {
        // Accept images and videos
        if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only image and video files are allowed'));
        }
    },
});
// Middleware for handling multiple media files
exports.commercialMediaUpload = upload.array('mediaFiles', 20); // Allow up to 20 files at once
// Function to upload a file to S3
const uploadToS3 = async (file, roomType, mediaType) => {
    const uniqueFileName = `${(0, uuid_1.v4)()}-${file.originalname.replace(/\s+/g, '-')}`;
    const fileKey = `commercial-media/${mediaType}s/${roomType}/${uniqueFileName}`;
    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME || '',
        Key: fileKey,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        const command = new client_s3_1.PutObjectCommand(params);
        await s3.send(command);
        // Return the public URL of the uploaded file
        return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
    }
    catch (error) {
        console.error(`Error uploading ${mediaType} to S3:`, error);
        throw new Error(`Failed to upload ${mediaType} to S3`);
    }
};
exports.uploadToS3 = uploadToS3;
// Middleware to process and upload media files to S3
const processAndUploadCommercialMedia = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return next(); // No files to process, continue
        }
        const files = req.files;
        const mediaData = JSON.parse(req.body.mediaData || '[]');
        const mediaItems = [];
        const videoCount = mediaData.filter((item) => item.type === 'video').length;
        // Log the upload request details
        console.log(`Processing ${files.length} files (${videoCount} videos) for upload`);
        // Process each file
        for (const file of files) {
            // Find corresponding metadata from the mediaData
            const mediaInfo = mediaData.find((item) => item.id === file.originalname);
            if (!mediaInfo) {
                console.warn(`No metadata found for file: ${file.originalname}`);
                continue;
            }
            const { type, roomType, title, tags } = mediaInfo;
            const mediaType = type;
            const roomTypeFolder = roomType || 'general';
            // Upload to S3
            const url = await (0, exports.uploadToS3)(file, roomTypeFolder, mediaType);
            // Add to media items array
            mediaItems.push({
                id: (0, uuid_1.v4)(),
                type: mediaType,
                url,
                title: title || 'Untitled',
                tags: tags || [],
                roomType: roomType || undefined
            });
        }
        // Attach the media items to the request for the controller to use
        req.mediaItems = mediaItems;
        next();
    }
    catch (error) {
        console.error('Error processing media uploads:', error);
        return res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to process media uploads'
        });
    }
};
exports.processAndUploadCommercialMedia = processAndUploadCommercialMedia;
