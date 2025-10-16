"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommercialSellOfficeSpaceController_1 = require("../../controllers/commercial/CommercialSellOfficeSpaceController");
const router = express_1.default.Router();
router.post('/', CommercialSellOfficeSpaceController_1.createSellOfficeSpace);
router.get('/', CommercialSellOfficeSpaceController_1.getAllSellOfficeSpace);
router.get('/:propertyId', CommercialSellOfficeSpaceController_1.getSellOfficeSpaceById);
router.put('/:id', CommercialSellOfficeSpaceController_1.updateSellOfficeSpace);
router.delete('/:id', CommercialSellOfficeSpaceController_1.deleteSellOfficeSpace);
exports.default = router;
