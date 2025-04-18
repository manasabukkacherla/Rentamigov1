import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentRetailStore } from '../../controllers/commercial/commercialRentRetailStore';
const commercialRentRetailStore = express.Router();

// Create a new commercial shop listing
commercialRentRetailStore.post(
  '/',
  // auth,
  // uploadFields,
  // convertToBase64,
  createCommercialRentRetailStore
);

export default commercialRentRetailStore; 