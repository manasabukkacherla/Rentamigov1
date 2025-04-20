import express from 'express';
// import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialLeaseShop } from '../../controllers/commercial/commercialLeaseShop';
const router = express.Router();

// Create a new commercial lease shop listing
router.post('/',  createCommercialLeaseShop);

export default router; 