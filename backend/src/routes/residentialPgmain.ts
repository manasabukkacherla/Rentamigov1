import express from 'express';
import {
  createPg,
  getAllPgs,
  getPgById,
  updatePgById,
  deletePgById
} from '../controllers/residentialPgmainController';

const router = express.Router();

// Create new PG listing
router.post('/', createPg);

// Get all PG listings
router.get('/', getAllPgs);

// Get PG by ID
router.get('/:id', getPgById);

// Update PG by ID
router.put('/:id', updatePgById);

// Delete PG by ID
router.delete('/:id', deletePgById);

export default router;
