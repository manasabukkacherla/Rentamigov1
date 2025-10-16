"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const residentialSaleApartmentController_1 = require("../../controllers/residential/residentialSaleApartmentController");
const residentialSaleApartmentRoutes = express_1.default.Router();
residentialSaleApartmentRoutes.post('/', residentialSaleApartmentController_1.createSaleApartment);
residentialSaleApartmentRoutes.get('/', residentialSaleApartmentController_1.getAllSaleApartments);
residentialSaleApartmentRoutes.get('/:propertyId', residentialSaleApartmentController_1.getSaleApartmentById);
residentialSaleApartmentRoutes.put('/:id', residentialSaleApartmentController_1.updateSaleApartment);
residentialSaleApartmentRoutes.delete('/:id', residentialSaleApartmentController_1.deleteSaleApartment);
exports.default = residentialSaleApartmentRoutes;
