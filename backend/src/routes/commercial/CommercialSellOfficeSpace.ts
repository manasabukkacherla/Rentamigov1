import express from 'express';
import {
    createSellOfficeSpace,
    getAllSellOfficeSpace,
    getSellOfficeSpaceById,
    updateSellOfficeSpace,
    deleteSellOfficeSpace
} from '../../controllers/commercial/CommercialSellOfficeSpaceController';

const router = express.Router();

router.post('/', createSellOfficeSpace);
router.get('/', getAllSellOfficeSpace);
router.get('/:propertyId', getSellOfficeSpaceById);
router.put('/:id', updateSellOfficeSpace);
router.delete('/:id', deleteSellOfficeSpace);

export default router; 