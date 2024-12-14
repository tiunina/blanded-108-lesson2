import { Router } from 'express';
import {
  addProductController,
  getAllProductsController,
  getProductsByIdController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getAllProductsController));
router.get('/:productId', ctrlWrapper(getProductsByIdController));
router.post('/', ctrlWrapper(addProductController));

export default router;
