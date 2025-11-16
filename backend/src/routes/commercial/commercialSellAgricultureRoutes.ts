import express from 'express';
import { createCommercialSellAgriculture, deleteCommercialSellAgriculture, getAllCommercialSellAgriculture, getCommercialSellAgricultureById, updateCommercialSellAgriculture } from '../../controllers/commercial/commercialSellAgricultureController';

const router = express.Router();

router.post('/', createCommercialSellAgriculture);
router.get('/', getAllCommercialSellAgriculture);
router.get('/:propertyId', getCommercialSellAgricultureById);
router.put('/:propertyId', updateCommercialSellAgriculture);
router.delete('/:id', deleteCommercialSellAgriculture);

export default router; 