"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentRetailStore_1 = require("../../controllers/commercial/commercialRentRetailStore");
const router = express_1.default.Router();
router.post('/', commercialRentRetailStore_1.createCommercialRentRetailStore);
router.get('/', commercialRentRetailStore_1.getAllCommercialRentRetail);
router.get('/:propertyId', commercialRentRetailStore_1.getCommercialRentRetailById);
router.put('/:id', commercialRentRetailStore_1.updateCommercialRentRetail);
router.delete('/:id', commercialRentRetailStore_1.deleteCommercialRentRetail);
exports.default = router;
