"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeaseRetail_1 = require("../../controllers/commercial/commercialLeaseRetail");
const router = express_1.default.Router();
// Create a new commercial lease retail property
router.post('/', commercialLeaseRetail_1.createCommercialLeaseRetail);
// Get all commercial lease retail properties
router.get('/', commercialLeaseRetail_1.getAllCommercialLeaseRetail);
// Get a specific commercial lease retail property by ID
router.get('/:propertyId', commercialLeaseRetail_1.getCommercialLeaseRetailById);
// Update a commercial lease retail property
router.put('/:id', commercialLeaseRetail_1.updateCommercialLeaseRetail);
// Delete a commercial lease retail property
router.delete('/:id', commercialLeaseRetail_1.deleteCommercialLeaseRetail);
exports.default = router;
