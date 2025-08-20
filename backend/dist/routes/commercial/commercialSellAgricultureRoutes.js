"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellAgricultureController_1 = require("../../controllers/commercial/commercialSellAgricultureController");
const router = express_1.default.Router();
router.post('/', commercialSellAgricultureController_1.createCommercialSellAgriculture);
router.get('/', commercialSellAgricultureController_1.getAllCommercialSellAgriculture);
router.get('/:propertyId', commercialSellAgricultureController_1.getCommercialSellAgricultureById);
router.put('/:id', commercialSellAgricultureController_1.updateCommercialSellAgriculture);
router.delete('/:id', commercialSellAgricultureController_1.deleteCommercialSellAgriculture);
exports.default = router;
