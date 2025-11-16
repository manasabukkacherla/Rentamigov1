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


residentialRentIndependentHouseRoutes.get('/user/:userId', getUserIndependentHouses);


residentialRentIndependentHouseRoutes.get('/:propertyId', getRentIndependentHouseById);


residentialRentIndependentHouseRoutes.put('/:propertyId', updateRentIndependentHouse);

residentialRentIndependentHouseRoutes.delete('/:id', deleteRentIndependentHouse);

export default residentialRentIndependentHouseRoutes;
