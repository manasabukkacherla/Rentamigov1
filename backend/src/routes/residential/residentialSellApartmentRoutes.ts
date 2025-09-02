import express from 'express';
import {
  createSaleApartment,
  getSaleApartmentById,
  updateSaleApartment,
  deleteSaleApartment,
  getAllSaleApartments
} from '../../controllers/residential/residentialSaleApartmentController';

const residentialSaleApartmentRoutes = express.Router();

residentialSaleApartmentRoutes.post('/', createSaleApartment as express.RequestHandler);
residentialSaleApartmentRoutes.get('/', getAllSaleApartments as express.RequestHandler);
residentialSaleApartmentRoutes.get('/:propertyId', getSaleApartmentById as express.RequestHandler);
residentialSaleApartmentRoutes.put('/:id', updateSaleApartment as express.RequestHandler);
residentialSaleApartmentRoutes.delete('/:id', deleteSaleApartment as express.RequestHandler);

export default residentialSaleApartmentRoutes;