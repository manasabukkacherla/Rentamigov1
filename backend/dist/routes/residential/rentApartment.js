"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const rentApartment_1 = require("../../controllers/residential/rentApartment");
const residentialRentApartmentRoutes = express_1.default.Router();
residentialRentApartmentRoutes.post('/', rentApartment_1.createRentApartment);
residentialRentApartmentRoutes.get('/', rentApartment_1.getAllRentApartments);
residentialRentApartmentRoutes.put('/:id', rentApartment_1.updateRentApartment);
residentialRentApartmentRoutes.delete('/:id', rentApartment_1.deleteRentApartment);
residentialRentApartmentRoutes.get('/:propertyId', rentApartment_1.getRentApartmentById);
exports.default = residentialRentApartmentRoutes;
