"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellShowroomController_1 = require("../../controllers/commercial/commercialSellShowroomController");
const commercialSellShowroomRoutes = express_1.default.Router();
// Protected route for creating showroom
commercialSellShowroomRoutes.post('/', commercialSellShowroomController_1.createShowroom);
commercialSellShowroomRoutes.get('/', commercialSellShowroomController_1.getAllShowrooms);
commercialSellShowroomRoutes.get('/:propertyId', commercialSellShowroomController_1.getShowroom);
commercialSellShowroomRoutes.put('/:id', commercialSellShowroomController_1.updateShowroom);
commercialSellShowroomRoutes.delete('/:id', commercialSellShowroomController_1.deleteShowroom);
exports.default = commercialSellShowroomRoutes;
