import express from 'express';
import {
  getUserIndependentHouses,
  createRentIndependentHouse,
  getRentIndependentHouseById,
  getAllRentIndependentHouses,
  updateRentIndependentHouse,
  deleteRentIndependentHouse
} from '../../controllers/residential/rentIndependentHouse';

const residentialRentIndependentHouseRoutes = express.Router();

residentialRentIndependentHouseRoutes.post('/', createRentIndependentHouse);
residentialRentIndependentHouseRoutes.get('/', getAllRentIndependentHouses);
residentialRentIndependentHouseRoutes.get('/:propertyId', getRentIndependentHouseById);
residentialRentIndependentHouseRoutes.put('/:id', updateRentIndependentHouse);
residentialRentIndependentHouseRoutes.delete('/:id', deleteRentIndependentHouse);
residentialRentIndependentHouseRoutes.get('/:userId', getUserIndependentHouses);

export default residentialRentIndependentHouseRoutes;