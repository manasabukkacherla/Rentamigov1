import express from 'express';
import { createCommercialRentOpenSpace } from '../../controllers/commercial/commercialRentOpenSpace';

const router = express.Router();

// Create a new commercial open space property
router.post('/', createCommercialRentOpenSpace);

export default router; 