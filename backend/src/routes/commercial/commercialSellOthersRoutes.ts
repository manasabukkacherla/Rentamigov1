import express from 'express';
import { createCommercialSellOthers ,
  deleteCommercialSellOthers,
  getAllCommercialSellOthers,
  getCommercialSellOthersById,
  updateCommercialSellOthers
} from '../../controllers/commercial/commercialSellOthersController';


const router = express.Router();

router.post('/', createCommercialSellOthers);
router.get('/', getAllCommercialSellOthers);
router.get('/:id', getCommercialSellOthersById);
router.put('/:id', updateCommercialSellOthers); 
router.delete('/:id', deleteCommercialSellOthers);

export default router; 