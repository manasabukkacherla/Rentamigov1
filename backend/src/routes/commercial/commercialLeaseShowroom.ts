import express from 'express';
import { 
  createCommercialLeaseShowroom, 
  getAllCommercialLeaseShowroom, 
  getCommercialLeaseShowroomById,
  updateCommercialLeaseShowroom,
  deleteCommercialLeaseShowroom
} from '../../controllers/commercial/commercialLeaseShowroom';

const router = express.Router();

// Create a new commercial lease showroom property
router.post('/', createCommercialLeaseShowroom);

// Get all commercial lease showroom properties
router.get('/', getAllCommercialLeaseShowroom);

// Get a specific commercial lease showroom property by ID
router.get('/:propertyId', getCommercialLeaseShowroomById);

// Update a commercial lease showroom property
router.put('/:id', updateCommercialLeaseShowroom);

// Delete a commercial lease showroom property
router.delete('/:id', deleteCommercialLeaseShowroom);

export default router; 