import express from 'express';
import { createCommercialShed, updateCommercialShed, deleteCommercialShed, getAllCommercialSheds, getCommercialShedById } from '../../controllers/commercial/commercialSellShedController';

const commercialSellShedRoutes = express.Router();

// Routes
commercialSellShedRoutes.post('/', createCommercialShed);
commercialSellShedRoutes.get('/', getAllCommercialSheds);
commercialSellShedRoutes.get('/:propertyId', getCommercialShedById);
commercialSellShedRoutes.put('/:id', updateCommercialShed);
commercialSellShedRoutes.delete('/:id', deleteCommercialShed);

export default commercialSellShedRoutes; 