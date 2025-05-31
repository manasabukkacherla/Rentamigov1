import express from 'express';
import {
    createRentShowroom,
    deleteCommercialRentShowroom,
    getAllCommercialRentShowroom,
    getCommercialRentShowroomById,
    updateCommercialRentShowroom,
} from '../../controllers/commercial/commercialRentShowroomController';
import { authenticateUser } from '../../middleware/auth';
import fileUpload from '../../middleware/fileUpload';


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

const router = express.Router();


router.post('/', createRentShowroom);
router.get('/', getAllCommercialRentShowroom);
router.get('/:propertyId', getCommercialRentShowroomById);
router.put('/:id', updateCommercialRentShowroom);
router.delete('/:id', deleteCommercialRentShowroom);

export default router; 