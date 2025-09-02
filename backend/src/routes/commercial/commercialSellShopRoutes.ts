import express from 'express';
import { createCommercialShop, deleteCommercialSellShop, getAllCommercialSellShop, getCommercialSellShopById, updateCommercialSellShop } from '../../controllers/commercial/commercialSellShopController';
import fileUpload from '../../middleware/fileUpload';
import { authenticateUser } from '../../middleware/auth';

const commercialSellShopRoutes = express.Router();

const uploadFields = [
  { name: 'photos[exterior]', maxCount: 10 },
  { name: 'photos[interior]', maxCount: 10 },
  { name: 'photos[floorPlan]', maxCount: 5 },
  { name: 'photos[washrooms]', maxCount: 5 },
  { name: 'photos[lifts]', maxCount: 5 },
  { name: 'photos[emergencyExits]', maxCount: 5 },
  { name: 'videoTour', maxCount: 1 },
  { name: 'documents', maxCount: 5 }
];

// Create a new commercial shop listing
commercialSellShopRoutes.post('/', createCommercialShop);
commercialSellShopRoutes.get('/', getAllCommercialSellShop);
commercialSellShopRoutes.get('/:propertyId', getCommercialSellShopById);
commercialSellShopRoutes.put('/:id', updateCommercialSellShop);
commercialSellShopRoutes.delete('/:id', deleteCommercialSellShop);

export default commercialSellShopRoutes; 