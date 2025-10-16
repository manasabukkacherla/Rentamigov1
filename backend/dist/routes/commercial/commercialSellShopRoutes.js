"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commercialSellShopController_1 = require("../../controllers/commercial/commercialSellShopController");
const commercialSellShopRoutes = express_1.default.Router();
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
// Create a new commercial shop listing
commercialSellShopRoutes.post('/', commercialSellShopController_1.createCommercialShop);
commercialSellShopRoutes.get('/', commercialSellShopController_1.getAllCommercialSellShop);
commercialSellShopRoutes.get('/:propertyId', commercialSellShopController_1.getCommercialSellShopById);
commercialSellShopRoutes.put('/:id', commercialSellShopController_1.updateCommercialSellShop);
commercialSellShopRoutes.delete('/:id', commercialSellShopController_1.deleteCommercialSellShop);
exports.default = commercialSellShopRoutes;
