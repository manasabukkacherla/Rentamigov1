import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialSellShed, getAllSellShed, getSellShedById, deleteSellShed, updateSellShed 
} from '../../controllers/commercial/commercialSellShedController';

const router = express.Router();


router.post('/', createCommercialSellShed);
router.get('/', getAllSellShed);
// router.get('/filter', getShedsByFilters);
router.get('/:id', getSellShedById);
router.put('/:id', updateSellShed);
router.delete('/:id', deleteSellShed);

export default router; 