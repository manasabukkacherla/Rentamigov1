"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAndUploadResidentialMedia = exports.uploadToS3 = exports.residentialMediaUpload = void 0;
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
        // Accept images, videos, and PDF documents
        if (file.mimetype.startsWith('image/') ||
            file.mimetype.startsWith('video/') ||
            file.mimetype === 'application/pdf') {
            cb(null, true);
        }
        else {
            cb(new Error('Only image, video, and PDF files are allowed'));
        }
    },
});
// Middleware for handling multiple media files
exports.residentialMediaUpload = upload.array('mediaFiles', 20);
// Function to upload a file to S3
const uploadToS3 = async (file, propertyType, category, mediaType) => {
    const uniqueFileName = `${(0, uuid_1.v4)()}-${file.originalname.replace(/\s+/g, '-')}`;
    const fileKey = `residential-media/${propertyType}/${category}/${mediaType}s/${uniqueFileName}`;
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
        const s3Url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;
        // Debug logging
        console.log('S3 Upload Details:', {
            bucketName: process.env.AWS_S3_BUCKET_NAME,
            region: process.env.AWS_REGION,
            fileKey,
            generatedUrl: s3Url,
            envVarsSet: {
                bucketName: !!process.env.AWS_S3_BUCKET_NAME,
                region: !!process.env.AWS_REGION,
                accessKey: !!process.env.AWS_ACCESS_KEY_ID,
                secretKey: !!process.env.AWS_SECRET_ACCESS_KEY
            }
        });
        return s3Url;
    }
    catch (error) {
        console.error(`Error uploading ${mediaType} to S3:`, error);
        throw new Error(`Failed to upload ${mediaType} to S3`);
    }
};
exports.uploadToS3 = uploadToS3;
// Middleware to process and upload media files to S3
const processAndUploadResidentialMedia = async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            return next(); // No files to process, continue
        }
        const files = req.files;
        const propertyType = req.body.propertyType || 'general';
        const mediaData = JSON.parse(req.body.mediaData || '[]');
        const mediaItems = [];
        const videoCount = mediaData.filter((item) => item.type === 'video').length;
        // Log the upload request details
        console.log(`Processing ${files.length} files (${videoCount} videos) for upload`);
        // Debug log the mediaData and file names
        console.log('Media data IDs:', mediaData.map((item) => item.id));
        console.log('File originalnames:', files.map(file => file.originalname));
        // Process each file
        for (const file of files) {
            // Find corresponding metadata from the mediaData
            let mediaInfo = mediaData.find((item) => item.id === file.originalname);
            if (!mediaInfo) {
                console.warn(`No metadata found for file: ${file.originalname}`);
                // Create basic metadata to allow upload to continue
                const fileType = file.mimetype.startsWith('image/') ? 'photo' : file.mimetype === 'application/pdf' ? 'document' : 'video';
                mediaInfo = {
                    id: file.originalname,
                    type: fileType,
                    title: 'Untitled',
                    category: 'general'
                };
            }
            const { type, category, title } = mediaInfo;
            const mediaType = type;
            const categoryFolder = category || 'general';
            // Upload to S3
            const url = await (0, exports.uploadToS3)(file, propertyType, categoryFolder, mediaType);
            // Add to media items array
            const mediaItem = {
                id: (0, uuid_1.v4)(),
                type: mediaType,
                url,
                title: title || 'Untitled',
                category: categoryFolder
            };
            // Debug logging for each media item
            console.log('Created media item with S3 URL:', {
                id: mediaItem.id,
                type: mediaItem.type,
                url: mediaItem.url,
                isS3Url: mediaItem.url.includes('s3.')
            });
            mediaItems.push(mediaItem);
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
exports.processAndUploadResidentialMedia = processAndUploadResidentialMedia;
