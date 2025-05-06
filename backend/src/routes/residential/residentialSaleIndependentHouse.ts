import express from 'express';
import {
   createSaleIndependentHouse,
//    getAllRentIndependentHouse,
//    updateRentIndependentHouse,
//    deleteRentIndependentHouse,
   getUserIndependentHouses
} from '../../controllers/residential/residentialSaleIndependentHouse';

const router = express.Router();

router.post('/', createSaleIndependentHouse as express.RequestHandler);
// router.get('/', getAllRentIndependentHouse as express.RequestHandler);
// router.put('/:id', updateRentIndependentHouse as express.RequestHandler);
// router.delete('/:id', deleteRentIndependentHouse as express.RequestHandler);

export default router;
