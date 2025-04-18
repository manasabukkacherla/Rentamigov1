import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentShop } from '../../controllers/commercial/commercialRentShop';
const commercialRentShop = express.Router();

// Create a new commercial shop listing
commercialRentShop.post(
  '/',
  // auth,
  // uploadFields,
  // convertToBase64,
  createCommercialRentShop
);

export default commercialRentShop; 