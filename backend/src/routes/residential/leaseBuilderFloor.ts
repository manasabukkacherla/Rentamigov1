import express from 'express';
import {
  createLeaseBuilderFloor,
  getAllLeaseBuilderFloors,
  getLeaseBuilderFloorById,
  updateLeaseBuilderFloor,
  deleteLeaseBuilderFloor,
  searchLeaseBuilderFloors
} from '../../controllers/residential/leaseBuilderFloor';
import { authenticateUser } from '../../middleware/auth';

const router = express.Router();

// Public routes
router.get('/search', searchLeaseBuilderFloors);
router.get('/', getAllLeaseBuilderFloors);
router.get('/:propertyId', getLeaseBuilderFloorById);

// Protected routes - require authentication
router.post('/', authenticateUser, createLeaseBuilderFloor);
router.put('/:id', authenticateUser, updateLeaseBuilderFloor);
router.delete('/:id', authenticateUser, deleteLeaseBuilderFloor);

export default router;