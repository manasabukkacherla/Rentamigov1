import express from 'express';
import { createCommercialRentAgriculture, deleteCommercialRentAgriculture, getAllCommercialRentAgriculture, getCommercialRentAgricultureById, updateCommercialRentAgriculture } from '../../controllers/commercial/commercialRentAgricultureController';

const router = express.Router();

// Create a new commercial agriculture property
router.post('/', createCommercialRentAgriculture);
// Get all commercial Rent agriculture properties
router.get('/', getAllCommercialRentAgriculture);

// Get a specific commercial Rent agriculture property by ID
router.get('/:id', getCommercialRentAgricultureById);

// Update a commercial Rent agriculture property
router.put('/:id', updateCommercialRentAgriculture);

// Delete a commercial Rent agriculture property
router.delete('/:id', deleteCommercialRentAgriculture);


export default router; 