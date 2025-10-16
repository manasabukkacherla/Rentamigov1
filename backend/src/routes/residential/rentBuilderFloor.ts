import express from 'express';
import {
  createRentBuilderFloor,
  getRentBuilderFloorById,
  updateRentBuilderFloor,
  deleteRentBuilderFloor,
  getAllRentBuilderFloors,
  getUserBuilderFloors
} from '../../controllers/residential/rentBuilderFloor';

const residentialRentBuilderFloorRoutes = express.Router();

residentialRentBuilderFloorRoutes.post('/', createRentBuilderFloor);
residentialRentBuilderFloorRoutes.get('/', getAllRentBuilderFloors);
residentialRentBuilderFloorRoutes.get('/:propertyId', getRentBuilderFloorById);
residentialRentBuilderFloorRoutes.put('/:id', updateRentBuilderFloor);
residentialRentBuilderFloorRoutes.delete('/:id', deleteRentBuilderFloor);
residentialRentBuilderFloorRoutes.get('/:userId', getUserBuilderFloors);

export default residentialRentBuilderFloorRoutes;