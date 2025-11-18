import express from 'express';
import {
    createPlot,
    getAllPlots,
    getPlotById,
    updatePlotById,
    deleteSellPlotById
} from '../../controllers/commercial/commericalSellPlotController';

const router = express.Router();

// Create a new commercial plot listing
router.post('/', createPlot as express.RequestHandler);

// Get all commercial plot listings
router.get('/', getAllPlots as express.RequestHandler);

// Get a specific commercial plot by ID
router.get('/:propertyId', getPlotById as express.RequestHandler);

// Update a plot listing by propertyId
router.put('/:propertyId', updatePlotById as express.RequestHandler);

// Delete plot listing by MongoDB ID
router.delete('/:id', deleteSellPlotById as express.RequestHandler);

export default router;
