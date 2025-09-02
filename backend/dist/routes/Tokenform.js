"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/tokenRoutes.ts
const express_1 = __importDefault(require("express"));
const Tokensform_1 = __importDefault(require("../models/Tokensform"));
const TokenRouter = express_1.default.Router();
// Get all token packages
TokenRouter.get('/', async (req, res) => {
    try {
        const packages = await Tokensform_1.default.find();
        res.json(packages);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
// Get a single token package by ID
TokenRouter.get('/:id', async (req, res) => {
    try {
        const tokenPackage = await Tokensform_1.default.findById(req.params.id);
        if (!tokenPackage)
            return res.status(404).json({ message: 'Token package not found' });
        res.json(tokenPackage);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
});
// Create a new token package
TokenRouter.post('/', async (req, res) => {
    try {
        const newPackage = new Tokensform_1.default(req.body);
        await newPackage.save();
        res.status(201).json(newPackage);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating package', error });
    }
});
// Update an existing token package
TokenRouter.put('/:id', async (req, res) => {
    try {
        const updatedPackage = await Tokensform_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPackage)
            return res.status(404).json({ message: 'Token package not found' });
        res.json(updatedPackage);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating package', error });
    }
});
// Delete a token package
TokenRouter.delete('/:id', async (req, res) => {
    try {
        const deletedPackage = await Tokensform_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPackage)
            return res.status(404).json({ message: 'Token package not found' });
        res.json({ message: 'Token package deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting package', error });
    }
});
exports.default = TokenRouter;
