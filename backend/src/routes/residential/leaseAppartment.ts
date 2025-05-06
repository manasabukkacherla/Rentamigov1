import express from 'express';
import {
  createLeaseApartment,
  getLeaseApartmentById,
  updateLeaseApartment,
  deleteLeaseApartment,
  getAllLeaseApartments
} from '../../controllers/residential/leaseAppartment';

const Router= express.Router();

Router.post('/', createLeaseApartment);
Router.get('/', getAllLeaseApartments);
Router.get('/:id', getLeaseApartmentById);
Router.put('/:id', updateLeaseApartment);
Router.delete('/:id', deleteLeaseApartment);

export default Router;