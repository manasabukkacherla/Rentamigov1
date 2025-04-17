import express from 'express';
import { createRentWarehouse } from '../../controllers/commercial/commercialRentWarehouse';

const commercialRentWarehouseRoutes = express.Router();

// Routes - only POST method
commercialRentWarehouseRoutes.route('/')
  .post(createRentWarehouse);

export default commercialRentWarehouseRoutes; 