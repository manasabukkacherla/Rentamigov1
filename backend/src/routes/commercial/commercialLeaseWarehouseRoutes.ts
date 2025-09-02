import express from 'express';
import {
    createLeaseWarehouse,
    getAllLeaseWarehouses,
    getLeaseWarehouseById,
    updateLeaseWarehouse,
    deleteLeaseWarehouse
} from '../../controllers/commercial/commercialLeaseWarehouseController';

const commercialLeaseWarehouseRoutes = express.Router();

// Routes
commercialLeaseWarehouseRoutes.route('/')
    .post(createLeaseWarehouse)
    .get(getAllLeaseWarehouses);

commercialLeaseWarehouseRoutes.route('/:propertyId')
    .get(getLeaseWarehouseById)
    .put(updateLeaseWarehouse)
    .delete(deleteLeaseWarehouse);

export default commercialLeaseWarehouseRoutes; 