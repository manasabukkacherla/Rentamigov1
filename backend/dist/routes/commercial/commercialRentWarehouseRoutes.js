"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentWarehouse_1 = require("../../controllers/commercial/commercialRentWarehouse");
const commercialRentWarehouseRoutes = express_1.default.Router();
// Routes - only POST method
commercialRentWarehouseRoutes.route('/')
    .post(commercialRentWarehouse_1.createRentWarehouse)
    .get(commercialRentWarehouse_1.getAllRentWarehouses);
commercialRentWarehouseRoutes.route('/:propertyId')
    .get(commercialRentWarehouse_1.getRentWarehouseById)
    .put(commercialRentWarehouse_1.updateRentWarehouse)
    .delete(commercialRentWarehouse_1.deleteRentWarehouse);
exports.default = commercialRentWarehouseRoutes;
