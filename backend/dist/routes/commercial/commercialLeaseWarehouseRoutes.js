"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeaseWarehouseController_1 = require("../../controllers/commercial/commercialLeaseWarehouseController");
const commercialLeaseWarehouseRoutes = express_1.default.Router();
// Routes
commercialLeaseWarehouseRoutes.route('/')
    .post(commercialLeaseWarehouseController_1.createLeaseWarehouse)
    .get(commercialLeaseWarehouseController_1.getAllLeaseWarehouses);
commercialLeaseWarehouseRoutes.route('/:propertyId')
    .get(commercialLeaseWarehouseController_1.getLeaseWarehouseById)
    .put(commercialLeaseWarehouseController_1.updateLeaseWarehouse)
    .delete(commercialLeaseWarehouseController_1.deleteLeaseWarehouse);
exports.default = commercialLeaseWarehouseRoutes;
