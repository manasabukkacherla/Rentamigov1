import express from 'express';
import {
    createLeasePlot,
    getAllLeasePlots,
    // getPlotById,
    // updatePlotById,
    // deleteSalePlotById
} from '../../controllers/residential/residentialSalePlotController';

const router = express.Router();

// Create a new commercial lease plot listing
router.post('/', createLeasePlot as express.RequestHandler);

// Get all commercial lease plot listings
router.get('/', getAllLeasePlots as express.RequestHandler);

// Get a specific commercial lease plot by ID
// router.get('/:id', getPlotById as express.RequestHandler);
// // Update a shed listing
// router.put('/:id', updatePlotById as express.RequestHandler);

// // Delete a shed listing
// router.delete('/:id', deleteSalePlotById as express.RequestHandler);

export default router; 