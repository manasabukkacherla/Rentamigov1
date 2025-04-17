import express from 'express';
import { createCommercialShop } from '../../controllers/commercial/commercialShopController';
import fileUpload from '../../middleware/fileUpload';
import { authenticateUser } from '../../middleware/auth';

const router = express.Router();

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

// Create a new commercial shop listing
router.post('/create', authenticateUser, fileUpload.fields(uploadFields), createCommercialShop);

export default router; 