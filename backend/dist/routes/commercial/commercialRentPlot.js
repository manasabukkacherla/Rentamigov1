"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentPlot_1 = require("../../controllers/commercial/commercialRentPlot");
const router = express_1.default.Router();
router.post('/', commercialRentPlot_1.createCommercialRentPlot);
router.get('/', commercialRentPlot_1.getAllRentPlots);
router.get('/:propertyId', commercialRentPlot_1.getRentPlotById);
router.put('/:id', commercialRentPlot_1.updatePlotById);
router.delete('/:id', commercialRentPlot_1.deleteRentPlotById);
exports.default = router;
