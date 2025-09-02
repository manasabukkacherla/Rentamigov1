"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaseIndependent_1 = require("../../controllers/residential/leaseIndependent");
const Router = express_1.default.Router();
Router.post('/', leaseIndependent_1.createLeaseIndependentHouse);
Router.get('/', leaseIndependent_1.getAllLeaseIndependentHouses);
Router.get('/:propertyId', leaseIndependent_1.getLeaseIndependentHouseById);
Router.put('/:id', leaseIndependent_1.updateLeaseIndependentHouse);
Router.delete('/:id', leaseIndependent_1.deleteLeaseIndependentHouse);
exports.default = Router;
