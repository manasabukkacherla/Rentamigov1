import multer from 'multer';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response, NextFunction } from 'express';

// Define MediaItem interface
interface MediaItem {
  id: string;
  type: 'photo' | 'video' | 'document';
  url: string;
  title: string;
  category: string;
  tags: string[];
  roomType?: string;
}

// Define the S3 bucket URL
const s3BucketUrl = `https://${process.env.AWS_S3_BUCKET_NAME || 'rentamigo-bucket'}.s3.${process.env.AWS_REGION || 'eu-north-1'}.amazonaws.com`;

// Helper function to determine file type
const getFileType = (mimetype: string): 'photo' | 'video' | 'document' | null => {
  if (mimetype.startsWith('image/')) {
    return 'photo';
  } else if (mimetype.startsWith('video/')) {
    return 'video';
  } else if (
    mimetype === 'application/pdf' ||
    mimetype === 'application/msword' ||
    mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ) {
    return 'document';
  }
  return null;
};

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
  path: string,
  category: string = 'general',
  mediaType: 'photo' | 'video' | 'document' = 'photo'
): Promise<string> => {
  const uniqueFileName = `${uuidv4()}-${file.originalname.replace(/\s+/g, '-')}`;
  
  // For videos, always use videoTour as the category
  if (mediaType === 'video') {
    category = 'videoTour';
    console.log('Setting video category to videoTour');
  }
  
  const fileKey = `${path}/${uniqueFileName}`;

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
    return fileKey;
  } catch (error) {
    console.error(`Error uploading ${mediaType} to S3:`, error);
    throw new Error(`Failed to upload ${mediaType} to S3`);
  }
};

// Extend the Express Request type to include our custom properties
declare global {
  namespace Express {
    interface Request {
      mediaItems?: any[]; // Keep existing type definition to avoid conflicts
    }
  }
}

// Middleware to process and upload media files to S3
export const processAndUploadPropertyMedia = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files as Express.Multer.File[];
    
    if (!files || files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files were uploaded' });
    }

    const propertyType = req.body.propertyType;
    if (!propertyType) {
      return res.status(400).json({ success: false, error: 'Property type is required' });
    }

    const baseS3Path = `property-${req.body.mediaType || 'photos'}/${propertyType}`;
    const mediaItems: MediaItem[] = [];

    for (const file of files) {
      const fileCategory = file.fieldname.split('-')[0]; // Extract category from field name (e.g., "exterior-photo")
      
      // Fix for improper "mediaFiles" category - map it to a valid category
      let category = fileCategory;
      if (category === 'mediaFiles') {
        // Try to determine a proper category based on file.mimetype or default to 'exterior'
        category = file.mimetype.startsWith('video/') ? 'videoTour' : 'exterior';
        console.log(`Correcting category from 'mediaFiles' to '${category}'`);
      }
      
      const fileType = getFileType(file.mimetype);
      
      if (!fileType) {
        console.error(`Unsupported file type: ${file.mimetype}`);
        continue;
      }

      const s3Key = await uploadToS3(file, `${baseS3Path}/${category}`, category, fileType);
      
      if (!s3Key) {
        console.error(`Failed to upload file: ${file.originalname}`);
        continue;
      }

      const itemId = uuidv4();
      const url = `${s3BucketUrl}/${s3Key}`;
      
      const mediaItem: MediaItem = {
        id: itemId,
        type: fileType,
        url,
        title: req.body.title || file.originalname || 'Untitled',
        category: category, // Use the corrected category, not fileCategory
        tags: req.body.tags ? JSON.parse(req.body.tags) : []
      };

      mediaItems.push(mediaItem);
      console.log(`Processed media item: ${fileType} for category ${category}, url: ${url.substring(0, 50)}...`);
    }

    console.log(`Middleware processed ${mediaItems.length} media items`);
    console.log('Sample item:', mediaItems[0] ? JSON.stringify(mediaItems[0], null, 2) : 'none');
    
    // Attach the media items to the request object
    req.mediaItems = mediaItems;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error processing and uploading property media:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to process and upload property media'
    });
  }
};
