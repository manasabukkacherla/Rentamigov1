import express from 'express';
import {
    createPlot,
} 
from '../../controllers/commercial/commericalSellPlotController';
import { authenticateUser } from '../../middleware/auth';
const router = express.Router();
router.post('/', createPlot as express.RequestHandler);
export default router;