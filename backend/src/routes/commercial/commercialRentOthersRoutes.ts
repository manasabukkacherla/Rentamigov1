import express from 'express';
import { createCommercialRentOthers } from '../../controllers/commercial/commercialRentOthersController';

const router = express.Router();

// Create a new commercial other property for rent
router.post('/', createCommercialRentOthers);

export default router; 