import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentPlot } from '../../controllers/commercial/commercialRentPlot';

const commercialRentPlot = express.Router();

// Create a new commercial shop listing
commercialRentPlot.post(
  '/',
  // auth,
  // uploadFields,
  // convertToBase64,
  createCommercialRentPlot
);

export default commercialRentPlot; 