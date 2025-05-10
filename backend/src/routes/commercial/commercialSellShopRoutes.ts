import express from 'express';
import { protect } from '../../middleware/authMiddleware';
import { 
  createCommercialSellShop,
  getAllCommercialSellShops,
  getCommercialSellShopById,
  updateCommercialSellShop,
  deleteCommercialSellShop
} from '../../controllers/commercial/commercialSellShopController';

const router = express.Router();

// Create a new commercial shop listing for sale
// Optional authentication - metadata.createdBy will be used if user is authenticated
router.post('/', createCommercialSellShop);

// Get all commercial shop listings (public)
router.get('/', getAllCommercialSellShops);

// Get a single commercial shop listing by id (public)
router.get('/:id', getCommercialSellShopById);

// Update a commercial shop listing (protected - must be listing creator)
router.put('/:id', protect, updateCommercialSellShop);

// Delete a commercial shop listing (protected - must be listing creator)
router.delete('/:id', protect, deleteCommercialSellShop);

export default router; 