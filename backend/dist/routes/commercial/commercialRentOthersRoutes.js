"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentOthersController_1 = require("../../controllers/commercial/commercialRentOthersController");
const router = express_1.default.Router();
router.post('/', commercialRentOthersController_1.createCommercialRentOthers);
router.get('/', commercialRentOthersController_1.getAllCommercialRentOthers);
router.get('/:propertyId', commercialRentOthersController_1.getCommercialRentOthersById);
router.put('/:id', commercialRentOthersController_1.updateCommercialRentOthers);
router.delete('/:id', commercialRentOthersController_1.deleteCommercialRentOthers);
exports.default = router;
