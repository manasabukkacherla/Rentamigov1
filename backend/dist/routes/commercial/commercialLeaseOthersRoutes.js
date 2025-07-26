"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeaseOthersController_1 = require("../../controllers/commercial/commercialLeaseOthersController");
const router = express_1.default.Router();
router.post('/', commercialLeaseOthersController_1.createCommercialLeaseOthers);
router.get('/', commercialLeaseOthersController_1.getAllCommercialLeaseOthers);
router.get('/:propertyId', commercialLeaseOthersController_1.getCommercialLeaseOthersById);
router.put('/:id', commercialLeaseOthersController_1.updateCommercialLeaseOthers);
router.delete('/:id', commercialLeaseOthersController_1.deleteCommercialLeaseOthers);
exports.default = router;
