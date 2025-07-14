"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellWarehouseController_1 = require("../../controllers/commercial/commercialSellWarehouseController");
const commercialSellWarehouseRoutes = express_1.default.Router();
// Routes - only POST method
commercialSellWarehouseRoutes.post('/', commercialSellWarehouseController_1.createCommercialWarehouse);
commercialSellWarehouseRoutes.get('/', commercialSellWarehouseController_1.getAllSellWarehouses);
commercialSellWarehouseRoutes.get('/:propertyId', commercialSellWarehouseController_1.getSellWarehouseById);
commercialSellWarehouseRoutes.put('/:id', commercialSellWarehouseController_1.updateSellWarehouse);
commercialSellWarehouseRoutes.delete('/:id', commercialSellWarehouseController_1.deleteSellWarehouse);
exports.default = commercialSellWarehouseRoutes;
