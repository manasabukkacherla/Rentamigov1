import express from 'express';
import {
    createShed,
    getSheds,
    getShedById,
    updateShed,
    deleteShed,
    // getShedsByFilters
} from '../../controllers/commercial/commercialLeaseShedController';

const router = express.Router();

// Create a new shed listing
router.post('/', createShed);

// Get all shed listings
router.get('/', getSheds);

// Get sheds by filters
// router.get('/filter', getShedsByFilters);

// Get a single shed listing by ID
router.get('/:propertyId', getShedById);

// Update a shed listing
router.put('/:id', updateShed);

// Delete a shed listing
router.delete('/:id', deleteShed);

export default router; 