"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CommericalLeaseOfficeSpaceController_1 = require("../../controllers/commercial/CommericalLeaseOfficeSpaceController");
const router = express_1.default.Router();
router.post('/', CommericalLeaseOfficeSpaceController_1.createLeaseOfficeSpace);
router.get('/', CommericalLeaseOfficeSpaceController_1.getLeaseOfficeSpaces);
router.get('/:propertyId', CommericalLeaseOfficeSpaceController_1.getLeaseOfficeSpaceById);
router.put('/:id', CommericalLeaseOfficeSpaceController_1.updateLeaseOfficeSpace);
router.delete('/:id', CommericalLeaseOfficeSpaceController_1.deleteLeaseOfficeSpace);
exports.default = router;
