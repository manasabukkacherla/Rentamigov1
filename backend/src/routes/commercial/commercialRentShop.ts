import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentShop, deleteCommercialRentShop, getAllCommercialRentShop, getCommercialRentShopById, updateCommercialRentShop } from '../../controllers/commercial/commercialRentShop';
const router = express.Router();


router.post('/',  createCommercialRentShop);
router.get('/', getAllCommercialRentShop);
router.get('/:propertyId',getCommercialRentShopById);
router.put('/:id', updateCommercialRentShop);
router.delete('/:id', deleteCommercialRentShop );

export default router; 
