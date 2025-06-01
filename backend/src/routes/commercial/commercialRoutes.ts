import express from 'express';
import { CommercialPropertyController } from '../../controllers/commercial/CommercialPropertyController';
import CommercialOfficeSpace from '../../models/commercial/CommercialRentOfficeSpace';

const router = express.Router();

// Create controllers for different property types
const commercialRentController = new CommercialPropertyController(CommercialOfficeSpace, 'RA-COMREOS');

// Routes for commercial rent properties
router.post('/', commercialRentController.createProperty.bind(commercialRentController));
router.get('/', commercialRentController.getProperties.bind(commercialRentController));
router.get('/:propertyId', commercialRentController.getPropertyById.bind(commercialRentController));
router.put('/:id', commercialRentController.updateProperty.bind(commercialRentController));
router.delete('/:id', commercialRentController.deleteProperty.bind(commercialRentController));

export default router;
