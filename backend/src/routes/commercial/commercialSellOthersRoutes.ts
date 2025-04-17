import express from 'express';
import { createCommercialSellOthers } from '../../controllers/commercial/commercialSellOthersController';

const router = express.Router();

// Only POST method is needed
router.post('/', createCommercialSellOthers);

export default router; 