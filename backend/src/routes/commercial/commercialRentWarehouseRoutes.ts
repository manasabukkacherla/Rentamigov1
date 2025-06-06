import express from 'express';
import { createRentWarehouse, deleteRentWarehouse, getAllRentWarehouses, getRentWarehouseById, updateRentWarehouse } from '../../controllers/commercial/commercialRentWarehouse';

const commercialRentWarehouseRoutes = express.Router();

// Routes - only POST method
commercialRentWarehouseRoutes.route('/')
  .post(createRentWarehouse)
  .get(getAllRentWarehouses);

commercialRentWarehouseRoutes.route('/:propertyId')
  .get(getRentWarehouseById)
  .put(updateRentWarehouse)
  .delete(deleteRentWarehouse);

export default commercialRentWarehouseRoutes; 