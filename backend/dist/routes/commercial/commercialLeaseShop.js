"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import upload, { convertToBase64 } from '../../middleware/fileUpload';
const commercialLeaseShop_1 = require("../../controllers/commercial/commercialLeaseShop");
const router = express_1.default.Router();
// Create a new commercial lease shop listing
router.post('/', commercialLeaseShop_1.createCommercialLeaseShop);
router.get('/', commercialLeaseShop_1.getAllCommercialLeaseShop);
// Get a single shed listing by ID
router.get('/:propertyId', commercialLeaseShop_1.getCommercialLeaseShopById);
// Update a shed listing
router.put('/:id', commercialLeaseShop_1.updateCommercialLeaseShop);
// Delete a shed listing
router.delete('/:id', commercialLeaseShop_1.deleteCommercialLeaseShop);
exports.default = router;
