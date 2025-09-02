"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commericalSellPlotController_1 = require("../../controllers/commercial/commericalSellPlotController");
const router = express_1.default.Router();
// Create a new commercial plot listing
router.post('/', commericalSellPlotController_1.createPlot);
// Get all commercial plot listings
router.get('/', commericalSellPlotController_1.getAllPlots);
// Get a specific commercial plot by ID
router.get('/:propertyId', commericalSellPlotController_1.getPlotById);
// Update a plot listing
exports.default = router;
