import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentShed, getSheds, getShedById, deleteShed, updateShed } from '../../controllers/commercial/commercialRentShed';
const commercialRentSheds = express.Router();

const router = express.Router();


router.post('/', createCommercialRentShed);
router.get('/', getSheds);
// router.get('/filter', getShedsByFilters);
router.get('/:propertyId', getShedById);
router.put('/:id', updateShed);
router.delete('/:id', deleteShed);

export default router; 