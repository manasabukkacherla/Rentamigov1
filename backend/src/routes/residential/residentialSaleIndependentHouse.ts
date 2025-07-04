import express from 'express';
import {
   createSaleIndependentHouse,
   getAllSaleIndependentHouse,
   getSaleIndependentHouseById,
   updateSaleIndependentHouse,
   deleteSaleIndependentHouse,
} from '../../controllers/residential/residentialSaleIndependentHouse';

const router = express.Router();

router.post('/', createSaleIndependentHouse as express.RequestHandler);
 router.get('/', getAllSaleIndependentHouse as express.RequestHandler);
 router.put('/:id', updateSaleIndependentHouse as express.RequestHandler);
 router.delete('/:id', deleteSaleIndependentHouse as express.RequestHandler);
 router.get('/:propertyId', getSaleIndependentHouseById as express.RequestHandler);

export default router;
