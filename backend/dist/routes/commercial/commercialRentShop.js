"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentShop_1 = require("../../controllers/commercial/commercialRentShop");
const router = express_1.default.Router();
router.post('/', commercialRentShop_1.createCommercialRentShop);
router.get('/', commercialRentShop_1.getAllCommercialRentShop);
router.get('/:propertyId', commercialRentShop_1.getCommercialRentShopById);
router.put('/:id', commercialRentShop_1.updateCommercialRentShop);
router.delete('/:id', commercialRentShop_1.deleteCommercialRentShop);
exports.default = router;
