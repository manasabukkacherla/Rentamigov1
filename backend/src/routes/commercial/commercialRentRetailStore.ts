import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentRetailStore, deleteCommercialRentRetail, getAllCommercialRentRetail, getCommercialRentRetailById, updateCommercialRentRetail } from '../../controllers/commercial/commercialRentRetailStore';
const router = express.Router();

router.post('/', createCommercialRentRetailStore);
router.get('/', getAllCommercialRentRetail);
router.get('/:propertyId', getCommercialRentRetailById);
router.put('/:id', updateCommercialRentRetail);
router.delete('/:id', deleteCommercialRentRetail);

export default router; 