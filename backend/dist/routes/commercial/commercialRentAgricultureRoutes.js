"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentAgricultureController_1 = require("../../controllers/commercial/commercialRentAgricultureController");
const router = express_1.default.Router();
router.post('/', commercialRentAgricultureController_1.createCommercialRentAgriculture);
router.get('/', commercialRentAgricultureController_1.getAllCommercialRentAgriculture);
router.get('/:propertyId', commercialRentAgricultureController_1.getCommercialRentAgricultureById);
router.put('/:id', commercialRentAgricultureController_1.updateCommercialRentAgriculture);
router.delete('/:id', commercialRentAgricultureController_1.deleteCommercialRentAgriculture);
exports.default = router;
