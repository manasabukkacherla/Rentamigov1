"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaseBuilderFloor_1 = require("../../controllers/residential/leaseBuilderFloor");
const router = express_1.default.Router();
// Public routes
router.get('/search', leaseBuilderFloor_1.searchLeaseBuilderFloors);
router.get('/', leaseBuilderFloor_1.getAllLeaseBuilderFloors);
router.get('/:propertyId', leaseBuilderFloor_1.getLeaseBuilderFloorById);
// Protected routes - require authentication
router.post('/', leaseBuilderFloor_1.createLeaseBuilderFloor);
router.put('/:id', leaseBuilderFloor_1.updateLeaseBuilderFloor);
router.delete('/:id', leaseBuilderFloor_1.deleteLeaseBuilderFloor);
exports.default = router;
