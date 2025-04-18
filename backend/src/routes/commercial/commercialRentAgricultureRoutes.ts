import express from 'express';
import { createCommercialRentAgriculture } from '../../controllers/commercial/commercialRentAgricultureController';

const router = express.Router();

// Create a new commercial agriculture property
router.post('/', createCommercialRentAgriculture);

export default router; 