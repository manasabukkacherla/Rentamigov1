import express from 'express';
import {
    createRentShowroom,
    getAllRentShowrooms,
    getRentShowroomById,
    updateRentShowroom,
    deleteRentShowroom
} from '../../controllers/commercial/commercialRentShowroomController';
import { authenticateUser } from '../../middleware/auth';
import fileUpload from '../../middleware/fileUpload';

const router = express.Router();

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
router.post('/', fileUpload.fields(uploadFields), createRentShowroom);

// GET - Get all rent showroom listings
router.get('/', getAllRentShowrooms);

// GET - Get a specific rent showroom by ID
router.get('/:id', getRentShowroomById);

// PUT - Update a rent showroom listing
router.put('/:id', fileUpload.fields(uploadFields), updateRentShowroom);

// DELETE - Delete a rent showroom listing
router.delete('/:id', deleteRentShowroom);

export default router; 