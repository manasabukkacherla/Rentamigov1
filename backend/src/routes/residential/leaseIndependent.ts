// import express from 'express';
// import {
//     getLeaseIndependentHouseById,
//   createLeaseIndependentHouse,
//   getAllLeaseIndependentHouses,
//   updateLeaseIndependentHouse,
//   deleteLeaseIndependentHouse
// } from '../../controllers/residential/leaseIndependent';

// const Router = express.Router();

// Router.post('/', createLeaseIndependentHouse);
// Router.get('/', getAllLeaseIndependentHouses);
// Router.get('/:Id', getLeaseIndependentHouseById);
// Router.put('/:Id', updateLeaseIndependentHouse);
// Router.delete('/:Id', deleteLeaseIndependentHouse);

// export default Router;
// In your router file
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
Router.put('/:propertyId', updateLeaseIndependentHouse); 
Router.delete('/:propertyId', deleteLeaseIndependentHouse); 

export default Router;