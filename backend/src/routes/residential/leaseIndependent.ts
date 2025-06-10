import express from 'express';
import {
    getLeaseIndependentHouseById,
  createLeaseIndependentHouse,
  getAllLeaseIndependentHouses,
  updateLeaseIndependentHouse,
  deleteLeaseIndependentHouse
} from '../../controllers/residential/leaseIndependent';

const Router = express.Router();

Router.post('/', createLeaseIndependentHouse);
Router.get('/', getAllLeaseIndependentHouses);
Router.get('/:propertyId', getLeaseIndependentHouseById);
Router.put('/:id', updateLeaseIndependentHouse);
Router.delete('/:id', deleteLeaseIndependentHouse);

export default Router;