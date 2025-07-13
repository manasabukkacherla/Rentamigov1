"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellOthersController_1 = require("../../controllers/commercial/commercialSellOthersController");
const router = express_1.default.Router();
router.post('/', commercialSellOthersController_1.createCommercialSellOthers);
router.get('/', commercialSellOthersController_1.getAllCommercialSellOthers);
router.get('/:propertyId', commercialSellOthersController_1.getCommercialSellOthersById);
router.put('/:id', commercialSellOthersController_1.updateCommercialSellOthers);
router.delete('/:id', commercialSellOthersController_1.deleteCommercialSellOthers);
exports.default = router;
