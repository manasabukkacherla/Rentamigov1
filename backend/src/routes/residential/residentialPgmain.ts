import express from 'express';
import {
  createPg,
  getAllPgs,
  getPgByPropertyId,
  updatePgById,
  deletePgById
} from '../../controllers/residential/residentialPgmainController';

const router = express.Router();

// Create new PG listing
router.post('/', createPg);

// Get all PG listings
router.get('/', getAllPgs);

// Get PG by Property ID
router.get('/:propertyId', getPgByPropertyId);

// Update PG by ID
router.put('/:id', updatePgById);

// Delete PG by ID
router.delete('/:id', deletePgById);

export default router;
