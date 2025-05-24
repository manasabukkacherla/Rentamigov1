import multer from 'multer';
import { Request } from 'express';

// Define file types
type FileType = 'image' | 'video' | 'document';

// Define allowed MIME types
const ALLOWED_MIME_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/webp'],
  video: ['video/mp4', 'video/webm'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

// Configure memory storage
const storage = multer.memoryStorage();

// File filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  let fileType: FileType | null = null;
  
  if (file.fieldname.startsWith('photos')) {
    fileType = 'image';
  } else if (file.fieldname === 'videoTour') {
    fileType = 'video';
  } else if (file.fieldname.startsWith('documents')) {
    fileType = 'document';
  }

  if (fileType && ALLOWED_MIME_TYPES[fileType].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${ALLOWED_MIME_TYPES[fileType || 'image'].join(', ')}`));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
    files: 25 // Maximum 25 files per request
  }
});

// Middleware to convert uploaded files to base64
export const convertToBase64 = (req: Request, res: any, next: any) => {
  if (!req.files) {
    return next();
  }

  // Convert files to base64
  const files = req.files as Express.Multer.File[];
  const base64Files: { [key: string]: string | string[] } = {};

  files.forEach(file => {
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    
    if (file.fieldname.startsWith('photos')) {
      if (!base64Files[file.fieldname]) {
        base64Files[file.fieldname] = [];
      }
      (base64Files[file.fieldname] as string[]).push(base64);
    } else {
      base64Files[file.fieldname] = base64;
    }
  });

  // Attach base64 files to request body
  req.body.media = base64Files;
  next();
};

export default upload; 