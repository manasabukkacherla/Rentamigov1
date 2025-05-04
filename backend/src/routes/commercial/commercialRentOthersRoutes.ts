import express from 'express';
import { createCommercialRentOthers, deleteCommercialRentOthers, getAllCommercialRentOthers, getCommercialRentOthersById, updateCommercialRentOthers } from '../../controllers/commercial/commercialRentOthersController';

const router = express.Router();

router.post('/', createCommercialRentOthers);
router.get('/', getAllCommercialRentOthers);
router.get('/:id', getCommercialRentOthersById);
router.put('/:id', updateCommercialRentOthers);
router.delete('/:id', deleteCommercialRentOthers);


export default router; 