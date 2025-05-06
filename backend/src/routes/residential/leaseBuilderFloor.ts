import express from 'express';
import {
  createLeaseBuilderFloor,
  getAllLeaseBuilderFloors,
  getLeaseBuilderFloorById,
  updateLeaseBuilderFloor,
  deleteLeaseBuilderFloor
} from '../../controllers/residential/leaseBuilderFloor';

const Router = express.Router();

Router.post('/', createLeaseBuilderFloor);
Router.get('/', getAllLeaseBuilderFloors);
Router.get('/:id', getLeaseBuilderFloorById);
Router.put('/:id', updateLeaseBuilderFloor);
Router.delete('/:id', deleteLeaseBuilderFloor);

export default Router;