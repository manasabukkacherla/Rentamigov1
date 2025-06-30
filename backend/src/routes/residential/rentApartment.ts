import express from 'express';

import {
  createRentApartment,
  getRentApartmentById,
  updateRentApartment,
  deleteRentApartment,
  getAllRentApartments
} from '../../controllers/residential/rentApartment';

const residentialRentApartmentRoutes = express.Router();

residentialRentApartmentRoutes.post('/', createRentApartment);
residentialRentApartmentRoutes.get('/', getAllRentApartments);
residentialRentApartmentRoutes.put('/:id', updateRentApartment);
residentialRentApartmentRoutes.delete('/:id', deleteRentApartment);
residentialRentApartmentRoutes.get('/:propertyId', getRentApartmentById);

export default residentialRentApartmentRoutes;