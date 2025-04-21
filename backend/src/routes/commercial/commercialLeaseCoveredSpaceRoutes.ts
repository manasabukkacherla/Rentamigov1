import express from 'express';
import {
    createCommercialLeaseCoveredSpace,
    getAllCommercialLeaseCoveredSpaces,
    getCommercialLeaseCoveredSpaceById,
    updateCommercialLeaseCoveredSpace,
    deleteCommercialLeaseCoveredSpace
} from '../../controllers/commercial/commercialLeaseCoveredSpaceController';

const router = express.Router();

// POST - Create a new commercial lease covered space
router.post('/', createCommercialLeaseCoveredSpace);

// GET - Get all commercial lease covered spaces (with filtering options)
router.get('/', getAllCommercialLeaseCoveredSpaces);

// GET - Get a specific commercial lease covered space by ID
router.get('/:id', getCommercialLeaseCoveredSpaceById);

// PUT - Update a commercial lease covered space
router.put('/:id', updateCommercialLeaseCoveredSpace);

// DELETE - Delete a commercial lease covered space
router.delete('/:id', deleteCommercialLeaseCoveredSpace);

export default router; 