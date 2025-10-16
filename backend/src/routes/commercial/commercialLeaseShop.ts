import express from 'express';
// import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialLeaseShop, deleteCommercialLeaseShop,getAllCommercialLeaseShop, updateCommercialLeaseShop, getCommercialLeaseShopById } 
from '../../controllers/commercial/commercialLeaseShop';

const router = express.Router();

// Create a new commercial lease shop listing
router.post('/',  createCommercialLeaseShop);

router.get('/', getAllCommercialLeaseShop);

// Get a single shed listing by ID
router.get('/:propertyId',getCommercialLeaseShopById);

// Update a shed listing
router.put('/:id', updateCommercialLeaseShop);

// Delete a shed listing
router.delete('/:id', deleteCommercialLeaseShop );

export default router; 