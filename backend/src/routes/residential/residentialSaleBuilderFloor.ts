import express from 'express';
import {
  createSaleBuilderFloor,
  getSaleBuilderFloorById,
  updateSaleBuilderFloor,
  deleteSaleBuilderFloor,
  getAllSaleBuilderFloors,
  getUserBuilderFloors
} from '../../controllers/residential/residentialSaleBuilderFloor';

const residentialSaleBuilderFloorRoutes = express.Router();

residentialSaleBuilderFloorRoutes.post('/', createSaleBuilderFloor);
residentialSaleBuilderFloorRoutes.get('/', getAllSaleBuilderFloors);
residentialSaleBuilderFloorRoutes.get('/:propertyId', getSaleBuilderFloorById);
residentialSaleBuilderFloorRoutes.put('/:id', updateSaleBuilderFloor);
residentialSaleBuilderFloorRoutes.delete('/:id', deleteSaleBuilderFloor);

export default residentialSaleBuilderFloorRoutes;