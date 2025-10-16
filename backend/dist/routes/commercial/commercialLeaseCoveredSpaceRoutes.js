"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialLeaseCoveredSpaceController_1 = require("../../controllers/commercial/commercialLeaseCoveredSpaceController");
const router = express_1.default.Router();
router.get('/', commercialLeaseCoveredSpaceController_1.getAllCommercialLeaseCoveredSpaces);
router.get('/:propertyId', commercialLeaseCoveredSpaceController_1.getCommercialLeaseCoveredSpaceById);
router.post('/', commercialLeaseCoveredSpaceController_1.createCommercialLeaseCoveredSpace);
router.put('/:id', commercialLeaseCoveredSpaceController_1.updateCommercialLeaseCoveredSpace);
router.delete('/:id', commercialLeaseCoveredSpaceController_1.deleteCommercialLeaseCoveredSpace);
exports.default = router;
