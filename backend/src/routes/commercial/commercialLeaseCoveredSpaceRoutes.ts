import express from 'express';
import {
  getAllCommercialLeaseCoveredSpaces,
  getCommercialLeaseCoveredSpaceById,
  createCommercialLeaseCoveredSpace,
  updateCommercialLeaseCoveredSpace,
  deleteCommercialLeaseCoveredSpace
} from '../../controllers/commercial/commercialLeaseCoveredSpaceController';

const router = express.Router();

router.get('/', getAllCommercialLeaseCoveredSpaces);
router.get('/:propertyId', getCommercialLeaseCoveredSpaceById);
router.post('/', createCommercialLeaseCoveredSpace);
router.put('/:id', updateCommercialLeaseCoveredSpace);
router.delete('/:id', deleteCommercialLeaseCoveredSpace);

export default router;