import express from 'express';
import {
  createCommercialLeaseOthers,
  getAllCommercialLeaseOthers,
  getCommercialLeaseOthersById,
  updateCommercialLeaseOthers,
  deleteCommercialLeaseOthers
} from '../../controllers/commercial/commercialLeaseOthersController';

const router = express.Router();

// POST - Create a new commercial lease others property
router.post('/', createCommercialLeaseOthers);

// GET - Get all commercial lease others properties
router.get('/', getAllCommercialLeaseOthers);

// GET - Get a specific commercial lease others property by ID
router.get('/:id', getCommercialLeaseOthersById);

// PUT - Update a commercial lease others property
router.put('/:id', updateCommercialLeaseOthers);

// DELETE - Delete a commercial lease others property
router.delete('/:id', deleteCommercialLeaseOthers);

export default router; 