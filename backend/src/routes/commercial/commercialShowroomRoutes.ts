import express from 'express';
import { createShowroom } from '../../controllers/commercial/commercialShowroomController';
import { protect } from '../../middleware/authMiddleware';

const router = express.Router();

// Protected route for creating showroom
router.post('/',  createShowroom);

export default router; 