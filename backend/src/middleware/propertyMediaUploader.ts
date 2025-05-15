import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

// Configure S3 Client
const s3 = new S3Client({
  region: process.env.AWS_REGION || 'eu-north-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 150 * 1024 * 1024, // 150MB limit for videos
    files: 20, // Maximum number of files
  },
  fileFilter: (req, file, cb) => {
    // Accept images, videos, and documents
    if (
      file.mimetype.startsWith('image/') || 
      file.mimetype.startsWith('video/') ||
      file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/msword' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only image, video, and document files are allowed'));
    }
  },
});

// Middleware for handling multiple media files
export const propertyMediaUpload = upload.array('mediaFiles', 20); // Allow up to 20 files at once

// Function to upload a file to S3
export const uploadToS3 = async (
  file: Express.Multer.File,
  propertyType: string,
  category: string,
  mediaType: 'photo' | 'video' | 'document'
): Promise<string> => {
  const uniqueFileName = `${uuidv4()}-${file.originalname.replace(/\s+/g, '-')}`;
  
  // Use different path structures for different media types
  let basePath = '';
  switch (mediaType) {
    case 'photo':
      basePath = 'property-photos';
      break;
    case 'video':
      basePath = 'property-videos';
      break;
    case 'document':
      basePath = 'property-documents';
      break;
    default:
      basePath = 'property-media';
  }
  
  // For videos, always use videoTour as the category
  if (mediaType === 'video') {
    category = 'videoTour';
    console.log('Setting video category to videoTour');
  }
  
  const fileKey = `${basePath}/${propertyType}/${category}/${uniqueFileName}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || 'rentamigo-bucket',
    Key: fileKey,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3.send(command);
    
    // Return the public URL of the uploaded file
    return `https://${process.env.AWS_S3_BUCKET_NAME || 'rentamigo-bucket'}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com/${fileKey}`;
  } catch (error) {
    console.error(`Error uploading ${mediaType} to S3:`, error);
    throw new Error(`Failed to upload ${mediaType} to S3`);
  }
};

// Extend the Express Request type to include our custom properties
declare global {
  namespace Express {
    interface Request {
      mediaItems?: any[];
    }
  }
}

// Middleware to process and upload media files to S3
export const processAndUploadPropertyMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next(); // No files to process, continue
    }

    const files = req.files as Express.Multer.File[];
    const mediaData = JSON.parse(req.body.mediaData || '[]');
    const propertyType = req.body.propertyType || 'unknown';
    
    const mediaItems = [];
    const videoCount = mediaData.filter((item: any) => item.type === 'video').length;
    
    // Log the upload request details
    console.log(`Processing ${files.length} files (${videoCount} videos) for property type: ${propertyType}`);
    
    // Log all media data for debugging
    console.log('Media data received:', mediaData);
    console.log('Files received:', files.map(f => ({ originalname: f.originalname, mimetype: f.mimetype, size: f.size })));
    
    // Process each file
    for (const file of files) {
      // Special handling for video files with the VIDEO_ prefix
      let mediaInfo;
      
      if (file.originalname.startsWith('VIDEO_')) {
        // Extract the ID from the video filename
        const videoId = file.originalname.replace('VIDEO_', '');
        mediaInfo = mediaData.find((item: any) => item.id === videoId);
        console.log(`Processing video file with ID: ${videoId}`);
      } else {
        // Regular handling for non-video files
        mediaInfo = mediaData.find((item: any) => item.id === file.originalname);
      }
      
      if (!mediaInfo) {
        console.error(`No metadata found for file: ${file.originalname}`);
        continue;
      }
      
      const { type, category, title, tags } = mediaInfo;
      const mediaType = type as 'photo' | 'video' | 'document';
      
      // Log file details before upload
      console.log(`Processing file: ${file.originalname}`, {
        mediaType,
        category,
        mimetype: file.mimetype,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
      });
      
      // Special handling for video files
      if (mediaType === 'video') {
        console.log('Processing video file:', {
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          category
        });
      }
      
      // Upload to S3
      let url = await uploadToS3(file, propertyType, category, mediaType);
      
      // Handle all media types the same way (photos, videos, documents)
      if (mediaType === 'video') {
        console.log(`Processing video file: ${file.originalname}, size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`);
        // No need to set category here as it's already set in the uploadToS3 function
        console.log(`Using category: ${category} for video file`);
      }
      
      // Generate a unique ID for this media item
      const mediaId = uuidv4();
      
      // Add to media items array
      mediaItems.push({
        id: mediaId,
        type: mediaType,
        url,
        title: title || 'Untitled',
        tags: tags || [],
        category: category || 'general'
      });
      
      // Enhanced logging for video items
      if (mediaType === 'video') {
        // Log immediately after upload
        console.log('✅ VIDEO UPLOAD SUCCESS ✅');
        console.log('AWS S3 VIDEO URL:', url);
        console.log('VIDEO DETAILS:', {
          id: mediaId,
          url,
          category,
          type: mediaType
        });
      }
    }
    
    // Attach the media items to the request for the controller to use
    req.mediaItems = mediaItems;
    next();
  } catch (error) {
    console.error('Error processing media uploads:', error);
    return res.status(500).json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to process media uploads' 
    });
  }
};
