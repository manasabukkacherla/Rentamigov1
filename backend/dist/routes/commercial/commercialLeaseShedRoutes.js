"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeaseShedController_1 = require("../../controllers/commercial/commercialLeaseShedController");
const router = express_1.default.Router();
// Create a new shed listing
router.post('/', commercialLeaseShedController_1.createShed);
// Get all shed listings
router.get('/', commercialLeaseShedController_1.getSheds);
// Get sheds by filters
// router.get('/filter', getShedsByFilters);
// Get a single shed listing by ID
router.get('/:propertyId', commercialLeaseShedController_1.getShedById);
// Update a shed listing
router.put('/:id', commercialLeaseShedController_1.updateShed);
// Delete a shed listing
router.delete('/:id', commercialLeaseShedController_1.deleteShed);
exports.default = router;
