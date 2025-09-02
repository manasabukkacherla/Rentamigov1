import express from 'express';
import { createLeaseApartment, deleteLeaseApartment, getAllLeaseApartments, getLeaseApartmentById, updateLeaseApartment } from '../../controllers/residential/leaseApartment';

const Router= express.Router();

Router.post('/', createLeaseApartment);
Router.get('/', getAllLeaseApartments);
Router.get('/:propertyId', getLeaseApartmentById);
Router.put('/:id', updateLeaseApartment);
Router.delete('/:id', deleteLeaseApartment);

export default Router;