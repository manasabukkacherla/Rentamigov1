import express from 'express';
import { createCommercialSellCoveredSpace,deleteCommercialSellCoveredSpace,getAllCommercialSellCoveredSpaces,updateCommercialSellCoveredSpace, getCommercialSellCoveredSpaceById
} from '../../controllers/commercial/commercialSellCoveredSpace';
const router = express.Router();

router.post('/', createCommercialSellCoveredSpace);
router.get('/', getAllCommercialSellCoveredSpaces);
router.get('/:propertyId', getCommercialSellCoveredSpaceById);
router.put('/:propertyId', updateCommercialSellCoveredSpace);
router.delete('/:id', deleteCommercialSellCoveredSpace);

export default router; 