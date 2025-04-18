import express from 'express';
import {
    createOfficeSpace,
    getOfficeSpaces,
    getOfficeSpaceById,
    updateOfficeSpace,
    deleteOfficeSpace
} from '../../controllers/commercial/CommercialRentOfficeSpaceController';

const router = express.Router();

// Create a new office space
router.post('/', createOfficeSpace);

// Get all office spaces
router.get('/', getOfficeSpaces);

// Get a single office space by ID
router.get('/:id', getOfficeSpaceById);

// Update an office space
router.put('/:id', updateOfficeSpace);

// Delete an office space
router.delete('/:id', deleteOfficeSpace);

export default router; 