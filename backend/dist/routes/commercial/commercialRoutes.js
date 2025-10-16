"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommercialPropertyController_1 = require("../../controllers/commercial/CommercialPropertyController");
const CommercialRentOfficeSpace_1 = __importDefault(require("../../models/commercial/CommercialRentOfficeSpace"));
const router = express_1.default.Router();
// Create controllers for different property types
const commercialRentController = new CommercialPropertyController_1.CommercialPropertyController(CommercialRentOfficeSpace_1.default, 'RA-COMREOS');
// Routes for commercial rent properties
router.post('/', commercialRentController.createProperty.bind(commercialRentController));
router.get('/', commercialRentController.getProperties.bind(commercialRentController));
router.get('/:propertyId', commercialRentController.getPropertyById.bind(commercialRentController));
router.put('/:id', commercialRentController.updateProperty.bind(commercialRentController));
router.delete('/:id', commercialRentController.deleteProperty.bind(commercialRentController));
exports.default = router;
