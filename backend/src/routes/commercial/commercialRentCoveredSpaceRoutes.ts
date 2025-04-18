import express from 'express';
import { createCommercialRentCoveredSpace } from '../../controllers/commercial/commercialRentCoveredSpace';

const router = express.Router();

// Create a new commercial covered space property
router.post('/', createCommercialRentCoveredSpace);

export default router; 