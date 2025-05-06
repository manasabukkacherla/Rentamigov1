import express from 'express';
import {
    createLeaseIndependentHouse,
    getLeaseIndependentHouseById,
    updateLeaseIndependentHouse ,
    deleteLeaseIndependentHouse,
  getAllLeaseIndependentHouses
} from '../../controllers/residential/residentialLeaseIndependenthouse';

const Router = express.Router();

Router.post('/', createLeaseIndependentHouse);
Router.get('/', getAllLeaseIndependentHouses);
Router.get('/:id', getLeaseIndependentHouseById);
Router.put('/:id', updateLeaseIndependentHouse );
Router.delete('/:id', deleteLeaseIndependentHouse);

export default Router;