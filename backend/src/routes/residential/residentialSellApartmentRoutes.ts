import { Router } from 'express';
import {
  createResidentialSaleApartment,
  getAllResidentialSaleApartments,
  getResidentialSaleApartmentById,
  updateResidentialSaleApartment,
  deleteResidentialSaleApartment
} from '../../controllers/residential/residentialSaleApartmentController';

const router = Router();

// Create
router.post('/', createResidentialSaleApartment);
// Read all
router.get('/', getAllResidentialSaleApartments);
// Read one
router.get('/:id', getResidentialSaleApartmentById);
// Update
router.put('/:id', updateResidentialSaleApartment);
// Delete
router.delete('/:id', deleteResidentialSaleApartment);

export default router;
