import express from 'express';
import { createShowroom } from '../../controllers/commercial/commercialShowroomController';

const router = express.Router();

// Protected route for creating showroom
router.post('/',  createShowroom);

export default router; 