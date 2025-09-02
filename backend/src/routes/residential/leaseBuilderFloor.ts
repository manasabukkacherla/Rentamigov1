import express from 'express';
import {
  createLeaseBuilderFloor,
  getAllLeaseBuilderFloors,
  getLeaseBuilderFloorById,
  updateLeaseBuilderFloor,
  deleteLeaseBuilderFloor,
  searchLeaseBuilderFloors
} from '../../controllers/residential/leaseBuilderFloor';

const router = express.Router();

// Public routes
router.get('/search', searchLeaseBuilderFloors);
router.get('/', getAllLeaseBuilderFloors);
router.get('/:propertyId', getLeaseBuilderFloorById);

// Protected routes - require authentication
router.post('/', createLeaseBuilderFloor);
router.put('/:id', updateLeaseBuilderFloor);
router.delete('/:id', deleteLeaseBuilderFloor);

export default router;