import express from 'express';
import { 
  createCommercialShed, 
  updateCommercialShed, 
  deleteCommercialShed, 
  getAllCommercialSheds, 
  getCommercialShedById 
} from '../../controllers/commercial/commercialSellShedController';

const commercialSellShedRoutes = express.Router();

// Routes
commercialSellShedRoutes.post('/', createCommercialShed as express.RequestHandler);
commercialSellShedRoutes.get('/', getAllCommercialSheds as express.RequestHandler);
commercialSellShedRoutes.get('/:propertyId', getCommercialShedById as express.RequestHandler);
commercialSellShedRoutes.put('/:propertyId', updateCommercialShed as express.RequestHandler);
commercialSellShedRoutes.delete('/:id', deleteCommercialShed as express.RequestHandler);

export default commercialSellShedRoutes;