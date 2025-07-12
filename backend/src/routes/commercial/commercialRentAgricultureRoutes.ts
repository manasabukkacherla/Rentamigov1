import express from 'express';
import { createCommercialRentAgriculture, deleteCommercialRentAgriculture, getAllCommercialRentAgriculture, getCommercialRentAgricultureById, updateCommercialRentAgriculture } from '../../controllers/commercial/commercialRentAgricultureController';

const router = express.Router();

router.post('/', createCommercialRentAgriculture);
router.get('/', getAllCommercialRentAgriculture);
router.get('/:propertyId', getCommercialRentAgricultureById);
router.put('/:id', updateCommercialRentAgriculture);
router.delete('/:id', deleteCommercialRentAgriculture);


export default router; 