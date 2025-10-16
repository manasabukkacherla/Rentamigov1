"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../../middleware/authMiddleware");
const commercialSellRetailStore_1 = require("../../controllers/commercial/commercialSellRetailStore");
const commercialSellRetailStore = express_1.default.Router();
// Create a new commercial sell retail store listing
// Optional authentication - metadata.createdBy will be used if user is not authenticated
commercialSellRetailStore.post('/', commercialSellRetailStore_1.createCommercialSellRetailStore);
// Get all commercial sell retail store listings (public)
commercialSellRetailStore.get('/', commercialSellRetailStore_1.getAllCommercialSellRetailStores);
// Get a single commercial sell retail store listing by id (public)
commercialSellRetailStore.get('/:propertyId', commercialSellRetailStore_1.getCommercialSellRetailStoreById);
// Update a commercial sell retail store listing
commercialSellRetailStore.put('/:id', authMiddleware_1.protect, commercialSellRetailStore_1.updateCommercialSellRetailStore);
// Delete a commercial sell retail store listing
commercialSellRetailStore.delete('/:id', authMiddleware_1.protect, commercialSellRetailStore_1.deleteCommercialSellRetailStore);
exports.default = commercialSellRetailStore;
