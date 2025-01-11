import { Router } from 'express';
import {
  addProductController,
  getAllProductsController,
  getProductsByIdController,
} from '../controllers/products.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validationBody } from '../middlewares/validationBody.js';
import { createProductShema } from '../validation/products.js';
import { isValidationId } from '../middlewares/validationId.js';
import { authenticate } from '../middlewares/authenticate.js';

const router = Router();
router.use(authenticate);

router.get('/', ctrlWrapper(getAllProductsController));
router.get(
  '/:productId',
  isValidationId,
  ctrlWrapper(getProductsByIdController),
);
router.post(
  '/',
  validationBody(createProductShema),
  ctrlWrapper(addProductController),
);

export default router;
