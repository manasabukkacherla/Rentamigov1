import express from 'express';
import { createCommercialRentCoveredSpace, deleteCommercialRentCoveredSpace, getAllCommercialRentCoveredSpaces, getCommercialRentCoveredSpaceById, updateCommercialRentCoveredSpace } from '../../controllers/commercial/commercialRentCoveredSpace';

const router = express.Router();

router.get('/', getAllCommercialRentCoveredSpaces);
router.get('/:propertyId', getCommercialRentCoveredSpaceById);
router.post('/', createCommercialRentCoveredSpace);
router.put('/:id', updateCommercialRentCoveredSpace);
router.delete('/:id', deleteCommercialRentCoveredSpace);

export default router; 