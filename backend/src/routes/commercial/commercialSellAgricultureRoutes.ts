import express from 'express';
import { 
  createCommercialSellAgriculture, 
  getAllCommercialSellAgriculture, 
  getCommercialSellAgricultureById 
} from '../../controllers/commercial/commercialSellAgricultureController';

const router = express.Router();

// Create a new commercial sell agriculture property
router.post('/', createCommercialSellAgriculture);

// Get all commercial sell agriculture properties
router.get('/', getAllCommercialSellAgriculture);

// Get a specific commercial sell agriculture property by ID
router.get('/:id', getCommercialSellAgricultureById);

export default router; 