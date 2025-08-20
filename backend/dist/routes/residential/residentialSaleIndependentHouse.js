"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const residentialSaleIndependentHouse_1 = require("../../controllers/residential/residentialSaleIndependentHouse");
const router = express_1.default.Router();
router.post('/', residentialSaleIndependentHouse_1.createSaleIndependentHouse);
router.get('/', residentialSaleIndependentHouse_1.getAllSaleIndependentHouse);
router.put('/:id', residentialSaleIndependentHouse_1.updateSaleIndependentHouse);
router.delete('/:id', residentialSaleIndependentHouse_1.deleteSaleIndependentHouse);
router.get('/:propertyId', residentialSaleIndependentHouse_1.getSaleIndependentHouseById);
exports.default = router;
