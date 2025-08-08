"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellShedController_1 = require("../../controllers/commercial/commercialSellShedController");
const commercialSellShedRoutes = express_1.default.Router();
// Routes
commercialSellShedRoutes.post('/', commercialSellShedController_1.createCommercialShed);
commercialSellShedRoutes.get('/', commercialSellShedController_1.getAllCommercialSheds);
commercialSellShedRoutes.get('/:propertyId', commercialSellShedController_1.getCommercialShedById);
commercialSellShedRoutes.put('/:id', commercialSellShedController_1.updateCommercialShed);
commercialSellShedRoutes.delete('/:id', commercialSellShedController_1.deleteCommercialShed);
exports.default = commercialSellShedRoutes;
