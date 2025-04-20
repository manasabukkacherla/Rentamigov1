import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentShed } from '../../controllers/commercial/commercialRentShed';
const commercialRentSheds = express.Router();

// Create a new commercial shop listing
commercialRentSheds.post(
  '/',
  // auth,
  // uploadFields,
  // convertToBase64,
  createCommercialRentShed
);

export default commercialRentSheds; 