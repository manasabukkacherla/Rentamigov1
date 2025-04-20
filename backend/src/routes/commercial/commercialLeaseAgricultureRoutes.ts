import express from 'express';
import { 
  createCommercialLeaseAgriculture, 
  getAllCommercialLeaseAgriculture, 
  getCommercialLeaseAgricultureById,
  updateCommercialLeaseAgriculture,
  deleteCommercialLeaseAgriculture
} from '../../controllers/commercial/commercialLeaseAgricultureController';

const router = express.Router();

// Create a new commercial lease agriculture property
router.post('/', createCommercialLeaseAgriculture);

// Get all commercial lease agriculture properties
router.get('/', getAllCommercialLeaseAgriculture);

// Get a specific commercial lease agriculture property by ID
router.get('/:id', getCommercialLeaseAgricultureById);

// Update a commercial lease agriculture property
router.put('/:id', updateCommercialLeaseAgriculture);

// Delete a commercial lease agriculture property
router.delete('/:id', deleteCommercialLeaseAgriculture);

export default router; 