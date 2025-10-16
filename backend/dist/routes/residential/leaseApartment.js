"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaseApartment_1 = require("../../controllers/residential/leaseApartment");
const Router = express_1.default.Router();
Router.post('/', leaseApartment_1.createLeaseApartment);
Router.get('/', leaseApartment_1.getAllLeaseApartments);
Router.get('/:propertyId', leaseApartment_1.getLeaseApartmentById);
Router.put('/:id', leaseApartment_1.updateLeaseApartment);
Router.delete('/:id', leaseApartment_1.deleteLeaseApartment);
exports.default = Router;
