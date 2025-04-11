import express from 'express';
import { createCommercialWarehouse } from '../../controllers/commercial/commercialWarehouseController';

const router = express.Router();

// Routes - only POST method
router.route('/')
  .post(createCommercialWarehouse);

export default router; 