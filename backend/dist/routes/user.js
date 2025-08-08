"use strict";
// File Path: backend/src/routes/user.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signup_1 = __importDefault(require("../models/signup")); // Adjust the path as necessary
// import { IUser } from '../models/user'; // Import the IUser interface if needed
const router = express_1.default.Router();
// Create a new user
router.post('/', async (req, res, next) => {
    try {
        const user = new signup_1.default(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
// Read all users
router.get('/', async (req, res, next) => {
    try {
        const users = await signup_1.default.find();
        res.status(200).json(users);
    }
    catch (error) {
        next(error);
    }
});
// Read a single user by ID
router.get('/:id', async (req, res, next) => {
    try {
        const user = await signup_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
// Update a user by ID
router.put('/:id', async (req, res, next) => {
    try {
        const user = await signup_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
// Delete a user by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const user = await signup_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
