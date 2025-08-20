import express from 'express';
import {
    createPlot,
    getAllPlots,
    getPlotById,
    // updatePlotById,
    // deletePlotById
} from '../../controllers/commercial/commericalSellPlotController';
import { authenticateUser } from '../../middleware/auth';

const router = express.Router();

// Create a new commercial plot listing
router.post('/', createPlot as express.RequestHandler);

// Get all commercial plot listings
router.get('/', getAllPlots as express.RequestHandler);

// Get a specific commercial plot by ID
router.get('/:propertyId', getPlotById as express.RequestHandler);

// Update a plot listing


export default router;