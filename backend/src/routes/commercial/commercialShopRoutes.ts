import express from 'express';
// import { auth } from '../middleware/auth';
import upload, { convertToBase64 } from '../middleware/fileUpload';
import {
  createCommercialShop,
  // getAllCommercialShops,
  // getCommercialShopById,
  // updateCommercialShop,
  // deleteCommercialShop,
  // changeListingStatus
} from '../controllers/commercialShopController';

const router = express.Router();

// Configure multer for different file types
const uploadFields = upload.fields([
  { name: 'photos.exterior', maxCount: 5 },
  { name: 'photos.interior', maxCount: 5 },
  { name: 'photos.displayArea', maxCount: 3 },
  { name: 'photos.storageArea', maxCount: 2 },
  { name: 'videoTour', maxCount: 1 },
  { name: 'documents.propertyTitle', maxCount: 1 },
  { name: 'documents.taxReceipts', maxCount: 1 },
  { name: 'documents.buildingApproval', maxCount: 1 },
  { name: 'documents.nocs', maxCount: 5 },
  { name: 'documents.otherDocuments', maxCount: 5 }
]);

// Create a new commercial shop listing
router.post(
  '/',
  // auth,
  uploadFields,
  convertToBase64,
  createCommercialShop
);

// Get all commercial shop listings with filters
// router.get('/', getAllCommercialShops);

// // Get a specific commercial shop by ID
// router.get('/:id', getCommercialShopById);

// // Update a commercial shop listing
// router.put(
//   '/:id',
//   // auth,
//   uploadFields,
//   convertToBase64,
//   updateCommercialShop
// );

// // Delete a commercial shop listing
// router.delete(
//   '/:id',
//   // auth,
//   deleteCommercialShop
// );

// // Change listing status
// router.patch(
//   '/:id/status',
//   // auth,
//   changeListingStatus
// );

export default router; 