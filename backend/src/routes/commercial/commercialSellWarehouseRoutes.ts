import express from 'express';
import { createCommercialWarehouse, deleteSellWarehouse, getAllSellWarehouses, getSellWarehouseById, updateSellWarehouse } from '../../controllers/commercial/commercialSellWarehouseController';

const commercialSellWarehouseRoutes = express.Router();

// Routes - only POST method
commercialSellWarehouseRoutes.post('/', createCommercialWarehouse);
commercialSellWarehouseRoutes.get('/', getAllSellWarehouses);
commercialSellWarehouseRoutes.get('/:propertyId', getSellWarehouseById);
commercialSellWarehouseRoutes.put('/:id', updateSellWarehouse);
commercialSellWarehouseRoutes.delete('/:id', deleteSellWarehouse);

export default commercialSellWarehouseRoutes; 