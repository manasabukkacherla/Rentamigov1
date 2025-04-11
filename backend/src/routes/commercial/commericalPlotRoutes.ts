import express from 'express';
import {
    createPlot,
    getAllPlots,
    getPlotById,
    updatePlot,
    deletePlot
} from '../../controllers/commericalSellPlotController';
import { authenticateUser } from '../../middleware/auth';

// Define the authenticated request type
interface AuthenticatedRequest extends express.Request {
    user: {
        _id: string;
    };
}

// Create a custom request handler type
type AuthenticatedRequestHandler = (
    req: AuthenticatedRequest,
    res: express.Response,
    next: express.NextFunction
) => Promise<void> | void;

const router = express.Router();
router.use(authenticateUser);
router.post('/', createPlot as unknown as express.RequestHandler);

router.get('/', getAllPlots as unknown as express.RequestHandler);

router.get('/:id', getPlotById as unknown as express.RequestHandler);


router.put('/:id', updatePlot as unknown as express.RequestHandler);


router.delete('/:id', deletePlot as unknown as express.RequestHandler);

export default router;