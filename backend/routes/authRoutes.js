import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {register, login, logout} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);

export default router;
