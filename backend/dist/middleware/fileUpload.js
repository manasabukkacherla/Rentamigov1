"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToBase64 = void 0;
const multer_1 = __importDefault(require("multer"));
// Define allowed MIME types
const ALLOWED_MIME_TYPES = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    video: ['video/mp4', 'video/webm'],
    document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};
// Configure memory storage
const storage = multer_1.default.memoryStorage();
// File filter
const fileFilter = (req, file, cb) => {
    let fileType = null;
    if (file.fieldname.startsWith('photos')) {
        fileType = 'image';
    }
    else if (file.fieldname === 'videoTour') {
        fileType = 'video';
    }
    else if (file.fieldname.startsWith('documents')) {
        fileType = 'document';
    }
    if (fileType && ALLOWED_MIME_TYPES[fileType].includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Invalid file type for ${file.fieldname}. Allowed types: ${ALLOWED_MIME_TYPES[fileType || 'image'].join(', ')}`));
    }
};
// Configure multer
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB file size limit
        files: 25 // Maximum 25 files per request
    }
});
// Middleware to convert uploaded files to base64
const convertToBase64 = (req, res, next) => {
    if (!req.files) {
        return next();
    }
    // Convert files to base64
    const files = req.files;
    const base64Files = {};
    files.forEach(file => {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        if (file.fieldname.startsWith('photos')) {
            if (!base64Files[file.fieldname]) {
                base64Files[file.fieldname] = [];
            }
            base64Files[file.fieldname].push(base64);
        }
        else {
            base64Files[file.fieldname] = base64;
        }
    });
    // Attach base64 files to request body
    req.body.media = base64Files;
    next();
};
exports.convertToBase64 = convertToBase64;
exports.default = upload;
