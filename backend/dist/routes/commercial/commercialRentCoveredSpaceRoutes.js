"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentCoveredSpace_1 = require("../../controllers/commercial/commercialRentCoveredSpace");
const router = express_1.default.Router();
router.get('/', commercialRentCoveredSpace_1.getAllCommercialRentCoveredSpaces);
router.get('/:propertyId', commercialRentCoveredSpace_1.getCommercialRentCoveredSpaceById);
router.post('/', commercialRentCoveredSpace_1.createCommercialRentCoveredSpace);
router.put('/:id', commercialRentCoveredSpace_1.updateCommercialRentCoveredSpace);
router.delete('/:id', commercialRentCoveredSpace_1.deleteCommercialRentCoveredSpace);
exports.default = router;
