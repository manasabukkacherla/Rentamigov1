import express from 'express';
import {
  createCommercialLeaseOthers,
  getAllCommercialLeaseOthers,
  getCommercialLeaseOthersById,
  updateCommercialLeaseOthers,
  deleteCommercialLeaseOthers
} from '../../controllers/commercial/commercialLeaseOthersController';

const router = express.Router();

router.post('/', createCommercialLeaseOthers);
router.get('/', getAllCommercialLeaseOthers);
router.get('/:propertyId', getCommercialLeaseOthersById);
router.put('/:id', updateCommercialLeaseOthers);
router.delete('/:id', deleteCommercialLeaseOthers);

export default router; 