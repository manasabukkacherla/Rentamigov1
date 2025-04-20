import express from 'express';
import {
    createLeasePlot,
    getAllLeasePlots,
    getLeasePlotById
} from '../../controllers/commercial/commercialLeasePlotController';

const router = express.Router();

// Create a new commercial lease plot listing
router.post('/', createLeasePlot as express.RequestHandler);

// Get all commercial lease plot listings
router.get('/', getAllLeasePlots as express.RequestHandler);

// Get a specific commercial lease plot by ID
router.get('/:id', getLeasePlotById as express.RequestHandler);

export default router; 