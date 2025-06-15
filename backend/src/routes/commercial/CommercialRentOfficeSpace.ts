import express from 'express';
import {
    createOfficeSpace,
    getOfficeSpaces,
    getOfficeSpaceById,
    updateOfficeSpace,
    deleteOfficeSpace
} from '../../controllers/commercial/CommercialRentOfficeSpaceController';

const router = express.Router();

router.post('/', createOfficeSpace);
router.get('/', getOfficeSpaces);
router.get('/:propertyId', getOfficeSpaceById);
router.put('/:id', updateOfficeSpace);
router.delete('/:id', deleteOfficeSpace);

export default router; 