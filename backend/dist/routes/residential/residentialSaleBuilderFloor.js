"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const residentialSaleBuilderFloor_1 = require("../../controllers/residential/residentialSaleBuilderFloor");
const residentialSaleBuilderFloorRoutes = express_1.default.Router();
residentialSaleBuilderFloorRoutes.post('/', residentialSaleBuilderFloor_1.createSaleBuilderFloor);
residentialSaleBuilderFloorRoutes.get('/', residentialSaleBuilderFloor_1.getAllSaleBuilderFloors);
residentialSaleBuilderFloorRoutes.get('/:propertyId', residentialSaleBuilderFloor_1.getSaleBuilderFloorById);
residentialSaleBuilderFloorRoutes.put('/:id', residentialSaleBuilderFloor_1.updateSaleBuilderFloor);
residentialSaleBuilderFloorRoutes.delete('/:id', residentialSaleBuilderFloor_1.deleteSaleBuilderFloor);
exports.default = residentialSaleBuilderFloorRoutes;
