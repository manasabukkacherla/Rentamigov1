import express from 'express';
import { createCommercialWarehouse, deleteSellWarehouse, getAllSellWarehouses, getSellWarehouseById, updateSellWarehouse } from '../../controllers/commercial/commercialSellWarehouseController';

const commercialSellWarehouseRoutes = express.Router();

// Routes - only POST method
commercialSellWarehouseRoutes.post('/', createCommercialWarehouse);
commercialSellWarehouseRoutes.get('/', getAllSellWarehouses);
commercialSellWarehouseRoutes.get('/:propertyId', getSellWarehouseById);
commercialSellWarehouseRoutes.put('/:propertyId', updateSellWarehouse);
commercialSellWarehouseRoutes.delete('/:propertyId', deleteSellWarehouse);

export default commercialSellWarehouseRoutes; 