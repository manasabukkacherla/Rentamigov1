// src/routes/propertyRoutes.ts
import express from 'express';
import { getAllProperties, getPropertyById } from '../controllers/propertyController';

const router = express.Router();

// ✅ Static route FIRST to avoid conflict with dynamic :id
router.get('/properties/all', getAllProperties);

// ✅ Dynamic route for individual property by ID
router.get('/properties/:id', getPropertyById);

export default router;
