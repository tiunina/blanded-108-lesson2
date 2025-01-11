import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  registrUserController,
} from '../controllers/auth.js';
import { loginSchema } from '../validation/auth.js';
import { validationBody } from '../middlewares/validationBody.js';

const router = Router();

router.post('/register', ctrlWrapper(registrUserController));

router.post(
  '/login',
  validationBody(loginSchema),
  ctrlWrapper(loginUserController),
);

export default router;
