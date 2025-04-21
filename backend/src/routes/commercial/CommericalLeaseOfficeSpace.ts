import express from 'express';
import {
    createLeaseOfficeSpace,
    getLeaseOfficeSpaces,
    getLeaseOfficeSpaceById,
    updateLeaseOfficeSpace,
    deleteLeaseOfficeSpace,
    searchLeaseOfficeSpaces
} from '../../controllers/commercial/CommericalLeaseOfficeSpaceController';

const router = express.Router();

// Create a new commercial lease office space
router.post('/', createLeaseOfficeSpace);

// Get all commercial lease office spaces
router.get('/', getLeaseOfficeSpaces);

// Search commercial lease office spaces based on criteria
router.get('/search', searchLeaseOfficeSpaces);

// Get a single commercial lease office space by ID
router.get('/:id', getLeaseOfficeSpaceById);

// Update a commercial lease office space
router.put('/:id', updateLeaseOfficeSpace);

// Delete a commercial lease office space
router.delete('/:id', deleteLeaseOfficeSpace);

export default router; 