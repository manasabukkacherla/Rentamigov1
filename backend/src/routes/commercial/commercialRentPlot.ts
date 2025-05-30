import express from 'express';
import upload, { convertToBase64 } from '../../middleware/fileUpload';
import { createCommercialRentPlot, deleteRentPlotById, getAllRentPlots, getRentPlotById, updatePlotById } from '../../controllers/commercial/commercialRentPlot';

const router = express.Router();

router.post('/', createCommercialRentPlot as express.RequestHandler);
router.get('/', getAllRentPlots as express.RequestHandler);
router.get('/:propertyId', getRentPlotById as express.RequestHandler);
router.put('/:id', updatePlotById as express.RequestHandler);
router.delete('/:id', deleteRentPlotById as express.RequestHandler);


export default router; 