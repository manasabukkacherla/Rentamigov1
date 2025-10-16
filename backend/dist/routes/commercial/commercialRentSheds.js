"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentShed_1 = require("../../controllers/commercial/commercialRentShed");
const commercialRentSheds = express_1.default.Router();
const router = express_1.default.Router();
router.post('/', commercialRentShed_1.createCommercialRentShed);
router.get('/', commercialRentShed_1.getSheds);
// router.get('/filter', getShedsByFilters);
router.get('/:propertyId', commercialRentShed_1.getShedById);
router.put('/:id', commercialRentShed_1.updateShed);
router.delete('/:id', commercialRentShed_1.deleteShed);
exports.default = router;
