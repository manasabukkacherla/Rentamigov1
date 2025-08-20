"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellCoveredSpace_1 = require("../../controllers/commercial/commercialSellCoveredSpace");
const router = express_1.default.Router();
router.post('/', commercialSellCoveredSpace_1.createCommercialSellCoveredSpace);
router.get('/', commercialSellCoveredSpace_1.getAllCommercialSellCoveredSpaces);
router.get('/:propertyId', commercialSellCoveredSpace_1.getAllCommercialSellCoveredSpaces);
router.put('/:id', commercialSellCoveredSpace_1.updateCommercialSellCoveredSpace);
router.delete('/:id', commercialSellCoveredSpace_1.deleteCommercialSellCoveredSpace);
exports.default = router;
