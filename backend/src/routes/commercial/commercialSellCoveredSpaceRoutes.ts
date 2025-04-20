import express from 'express';
import { 
  createCommercialSellCoveredSpace
} from '../../controllers/commercial/commercialSellCoveredSpace';

const router = express.Router();

// Create a new commercial covered space sale listing
router.post('/', createCommercialSellCoveredSpace);



export default router; 