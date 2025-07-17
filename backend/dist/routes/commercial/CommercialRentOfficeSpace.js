"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommercialRentOfficeSpaceController_1 = require("../../controllers/commercial/CommercialRentOfficeSpaceController");
const router = express_1.default.Router();
router.post('/', CommercialRentOfficeSpaceController_1.createOfficeSpace);
router.get('/', CommercialRentOfficeSpaceController_1.getOfficeSpaces);
router.get('/:propertyId', CommercialRentOfficeSpaceController_1.getOfficeSpaceById);
router.put('/:id', CommercialRentOfficeSpaceController_1.updateOfficeSpace);
router.delete('/:id', CommercialRentOfficeSpaceController_1.deleteOfficeSpace);
exports.default = router;
