"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const residentialSalePlotController_1 = require("../../controllers/residential/residentialSalePlotController");
const router = express_1.default.Router();
router.post('/', residentialSalePlotController_1.createPlot);
router.get('/', residentialSalePlotController_1.getAllPlots);
router.get('/:propertyId', residentialSalePlotController_1.getPlotById);
router.put('/:id', residentialSalePlotController_1.updatePlotById);
router.delete('/:id', residentialSalePlotController_1.deletePlotById);
exports.default = router;
