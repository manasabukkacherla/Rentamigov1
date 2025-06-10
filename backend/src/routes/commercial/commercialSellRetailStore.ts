import express from 'express';
import { protect } from '../../middleware/authMiddleware';
import { 
  createCommercialSellRetailStore,
  getAllCommercialSellRetailStores,
  getCommercialSellRetailStoreById,
  updateCommercialSellRetailStore,
  deleteCommercialSellRetailStore
} from '../../controllers/commercial/commercialSellRetailStore';

const commercialSellRetailStore = express.Router();

// Create a new commercial sell retail store listing
// Optional authentication - metadata.createdBy will be used if user is not authenticated
commercialSellRetailStore.post(
  '/',
  createCommercialSellRetailStore
);

// Get all commercial sell retail store listings (public)
commercialSellRetailStore.get('/', getAllCommercialSellRetailStores);

// Get a single commercial sell retail store listing by id (public)
commercialSellRetailStore.get('/:propertyId', getCommercialSellRetailStoreById);

// Update a commercial sell retail store listing
commercialSellRetailStore.put('/:id', protect, updateCommercialSellRetailStore);

// Delete a commercial sell retail store listing
commercialSellRetailStore.delete('/:id', protect, deleteCommercialSellRetailStore);

export default commercialSellRetailStore; 