import express from 'express';
import {
    createPlot,
    getAllPlots,
     getPlotById,
    updatePlotById,
    deletePlotById
} from '../../controllers/residential/residentialSalePlotController';

const router = express.Router();
router.post('/', createPlot as express.RequestHandler);
router.get('/', getAllPlots as express.RequestHandler);
router.get('/:propertyId', getPlotById as express.RequestHandler);
router.put('/:id', updatePlotById as express.RequestHandler);
router.delete('/:id', deletePlotById as express.RequestHandler);


export default router; 