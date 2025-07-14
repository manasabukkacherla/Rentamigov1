"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeaseShowroom_1 = require("../../controllers/commercial/commercialLeaseShowroom");
const router = express_1.default.Router();
// Create a new commercial lease showroom property
router.post('/', commercialLeaseShowroom_1.createCommercialLeaseShowroom);
// Get all commercial lease showroom properties
router.get('/', commercialLeaseShowroom_1.getAllCommercialLeaseShowroom);
// Get a specific commercial lease showroom property by ID
router.get('/:propertyId', commercialLeaseShowroom_1.getCommercialLeaseShowroomById);
// Update a commercial lease showroom property
router.put('/:id', commercialLeaseShowroom_1.updateCommercialLeaseShowroom);
// Delete a commercial lease showroom property
router.delete('/:id', commercialLeaseShowroom_1.deleteCommercialLeaseShowroom);
exports.default = router;
