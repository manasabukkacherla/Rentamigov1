"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeasePlotController_1 = require("../../controllers/commercial/commercialLeasePlotController");
const router = express_1.default.Router();
// Create a new commercial lease plot listing
router.post('/', commercialLeasePlotController_1.createLeasePlot);
// Get all commercial lease plot listings
router.get('/', commercialLeasePlotController_1.getAllLeasePlots);
// Get a specific commercial lease plot by ID
router.get('/:propertyId', commercialLeasePlotController_1.getLeasePlotById);
// Update a shed listing
router.put('/:id', commercialLeasePlotController_1.updatePlotById);
// Delete a shed listing
router.delete('/:id', commercialLeasePlotController_1.deleteLeasePlotById);
exports.default = router;
