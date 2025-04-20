import express from 'express';
import {
    createRentShowroom,
} from '../../controllers/commercial/commercialRentShowroomController';
import { authenticateUser } from '../../middleware/auth';
import fileUpload from '../../middleware/fileUpload';

const commercialRentShowroom = express.Router();

// Configure multer for different file types
const uploadFields = [
    { name: 'photos[exterior]', maxCount: 10 },
    { name: 'photos[interior]', maxCount: 10 },
    { name: 'photos[floorPlan]', maxCount: 5 },
    { name: 'photos[washrooms]', maxCount: 5 },
    { name: 'photos[lifts]', maxCount: 5 },
    { name: 'photos[emergencyExits]', maxCount: 5 },
    { name: 'videoTour', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
];

// Apply auth middleware to all routes
//router.use(authenticateUser);

// POST - Create a new rent showroom listing with file upload
commercialRentShowroom.post('/', createRentShowroom);

export default commercialRentShowroom; 