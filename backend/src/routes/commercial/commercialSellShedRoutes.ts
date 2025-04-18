import express from 'express';
import { 
  createCommercialSellShed, 
  
} from '../../controllers/commercial/commercialSellShedController';

const router = express.Router();

// Create a new commercial sell shed property
router.post('/', createCommercialSellShed);



export default router; 