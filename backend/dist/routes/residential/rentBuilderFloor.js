"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentBuilderFloor_1 = require("../../controllers/residential/rentBuilderFloor");
const residentialRentBuilderFloorRoutes = express_1.default.Router();
residentialRentBuilderFloorRoutes.post('/', rentBuilderFloor_1.createRentBuilderFloor);
residentialRentBuilderFloorRoutes.get('/', rentBuilderFloor_1.getAllRentBuilderFloors);
residentialRentBuilderFloorRoutes.get('/:propertyId', rentBuilderFloor_1.getRentBuilderFloorById);
residentialRentBuilderFloorRoutes.put('/:id', rentBuilderFloor_1.updateRentBuilderFloor);
residentialRentBuilderFloorRoutes.delete('/:id', rentBuilderFloor_1.deleteRentBuilderFloor);
residentialRentBuilderFloorRoutes.get('/:userId', rentBuilderFloor_1.getUserBuilderFloors);
exports.default = residentialRentBuilderFloorRoutes;
