import express from 'express';
import { 
  createCommercialLeaseRetail, 
  getAllCommercialLeaseRetail, 
  getCommercialLeaseRetailById,
  updateCommercialLeaseRetail,
  deleteCommercialLeaseRetail
} from '../../controllers/commercial/commercialLeaseRetail';

const router = express.Router();

// Create a new commercial lease retail property
router.post('/', createCommercialLeaseRetail);

// Get all commercial lease retail properties
router.get('/', getAllCommercialLeaseRetail);

// Get a specific commercial lease retail property by ID
router.get('/:propertyId', getCommercialLeaseRetailById);

// Update a commercial lease retail property
router.put('/:id', updateCommercialLeaseRetail);

// Delete a commercial lease retail property
router.delete('/:id', deleteCommercialLeaseRetail);

export default router; 