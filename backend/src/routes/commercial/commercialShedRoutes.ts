import express from 'express';
import {
  createCommercialShed
} from '../../controllers/commercial/commercialShedController';

const router = express.Router();

// Routes
router.route('/')
  .post(createCommercialShed);

export default router; 