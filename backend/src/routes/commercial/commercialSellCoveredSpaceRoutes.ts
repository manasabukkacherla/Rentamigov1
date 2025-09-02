import express from 'express';
import { 
  createCommercialSellCoveredSpace,deleteCommercialSellCoveredSpace,getAllCommercialSellCoveredSpaces,
  updateCommercialSellCoveredSpace
} from '../../controllers/commercial/commercialSellCoveredSpace';
const router = express.Router();

router.post('/', createCommercialSellCoveredSpace);
router.get('/', getAllCommercialSellCoveredSpaces);
router.get('/:propertyId', getAllCommercialSellCoveredSpaces);
router.put('/:id', updateCommercialSellCoveredSpace);
router.delete('/:id', deleteCommercialSellCoveredSpace);

export default router; 