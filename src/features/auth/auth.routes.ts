import { Router } from 'express';
import { createUser, forgotPassword, resetPassword } from './controllers/authController';

const router = Router();

router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/create', createUser);

export const authRoutes = router;
