import express from 'express';
import { 
  createCommercialLeaseAgriculture, 
  getAllCommercialLeaseAgriculture, 
  getCommercialLeaseAgricultureById,
  updateCommercialLeaseAgriculture,
  deleteCommercialLeaseAgriculture
} from '../../controllers/commercial/commercialLeaseAgricultureController';

const router = express.Router();


router.post('/', createCommercialLeaseAgriculture);
router.get('/', getAllCommercialLeaseAgriculture);
router.get('/:propertyId', getCommercialLeaseAgricultureById);
router.put('/:id', updateCommercialLeaseAgriculture);
router.delete('/:id', deleteCommercialLeaseAgriculture);

export default router; 