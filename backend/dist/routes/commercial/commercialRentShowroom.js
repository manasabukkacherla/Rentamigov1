"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialRentShowroomController_1 = require("../../controllers/commercial/commercialRentShowroomController");
// Configure multer for different file types
const uploadFields = [
    { name: 'photos[exterior]', maxCount: 10 },
    { name: 'photos[interior]', maxCount: 10 },
    { name: 'photos[floorPlan]', maxCount: 5 },
    { name: 'photos[washrooms]', maxCount: 5 },
    { name: 'photos[lifts]', maxCount: 5 },
    { name: 'photos[emergencyExits]', maxCount: 5 },
    { name: 'videoTour', maxCount: 1 },
    { name: 'documents', maxCount: 5 }
];
// Apply auth middleware to all routes
//router.use(authenticateUser);
const router = express_1.default.Router();
router.post('/', commercialRentShowroomController_1.createRentShowroom);
router.get('/', commercialRentShowroomController_1.getAllCommercialRentShowroom);
router.get('/:propertyId', commercialRentShowroomController_1.getCommercialRentShowroomById);
router.put('/:id', commercialRentShowroomController_1.updateCommercialRentShowroom);
router.delete('/:id', commercialRentShowroomController_1.deleteCommercialRentShowroom);
exports.default = router;
