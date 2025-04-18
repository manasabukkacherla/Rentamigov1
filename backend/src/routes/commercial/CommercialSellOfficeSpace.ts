import express from 'express';
import {
    createSellOfficeSpace

} from '../../controllers/commercial/CommercialSellOfficeSpaceController';

const router = express.Router();

// Create a new office space
router.post('/', createSellOfficeSpace);


export default router; 