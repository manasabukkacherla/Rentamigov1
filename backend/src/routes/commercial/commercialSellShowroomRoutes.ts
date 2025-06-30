import express from 'express';
import { createShowroom, deleteShowroom, getAllShowrooms, getShowroom, updateShowroom } from '../../controllers/commercial/commercialSellShowroomController';

const commercialSellShowroomRoutes = express.Router();

// Protected route for creating showroom
commercialSellShowroomRoutes.post('/',  createShowroom);
commercialSellShowroomRoutes.get('/', getAllShowrooms);
commercialSellShowroomRoutes.get('/:propertyId', getShowroom);
commercialSellShowroomRoutes.put('/:id', updateShowroom);
commercialSellShowroomRoutes.delete('/:id', deleteShowroom);

export default commercialSellShowroomRoutes; 