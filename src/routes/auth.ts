// src/routes/restaurantRoutes.ts

import express from 'express';
import {
  login,
  register,
  forgotPassword,
} from '../controllers/userController';

const router = express.Router();

router.post('/register', register);
router.get('/login', login);
router.get('/forgot-password', forgotPassword);

export default router;
