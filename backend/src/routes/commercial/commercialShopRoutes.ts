import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import {
  createCommercialShop,
  // getAllCommercialShops,
  // getCommercialShopById,
  // updateCommercialShop,
  // deleteCommercialShop,
  // changeListingStatus
} from '../../controllers/commercial/commercialShopController';

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
  // uploadFields,
  // convertToBase64,
  createCommercialShop
);



export default router; 