"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentIndependentHouse_1 = require("../../controllers/residential/rentIndependentHouse");
const residentialRentIndependentHouseRoutes = express_1.default.Router();
residentialRentIndependentHouseRoutes.post('/', rentIndependentHouse_1.createRentIndependentHouse);
residentialRentIndependentHouseRoutes.get('/', rentIndependentHouse_1.getAllRentIndependentHouses);
residentialRentIndependentHouseRoutes.get('/:propertyId', rentIndependentHouse_1.getRentIndependentHouseById);
residentialRentIndependentHouseRoutes.put('/:id', rentIndependentHouse_1.updateRentIndependentHouse);
residentialRentIndependentHouseRoutes.delete('/:id', rentIndependentHouse_1.deleteRentIndependentHouse);
residentialRentIndependentHouseRoutes.get('/:userId', rentIndependentHouse_1.getUserIndependentHouses);
exports.default = residentialRentIndependentHouseRoutes;
