import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registrUserController } from '../controllers/auth.js';

const router = Router();

router.post('/register', ctrlWrapper(registrUserController));
export default router;
