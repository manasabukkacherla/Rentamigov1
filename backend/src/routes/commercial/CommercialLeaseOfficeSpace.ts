import express from 'express';
import {
    createLeaseOfficeSpace,
    getLeaseOfficeSpaces,
    getLeaseOfficeSpaceById,
    updateLeaseOfficeSpace,
    deleteLeaseOfficeSpace,
    // searchLeaseOfficeSpaces
} from '../../controllers/commercial/CommericalLeaseOfficeSpaceController';

const router = express.Router();

router.post('/', createLeaseOfficeSpace);
router.get('/', getLeaseOfficeSpaces);
router.get('/:propertyId', getLeaseOfficeSpaceById);
router.put('/:id', updateLeaseOfficeSpace);
router.delete('/:id', deleteLeaseOfficeSpace);

export default router; 