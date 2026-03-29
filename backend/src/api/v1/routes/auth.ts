import { Router } from 'express';
import { login, logout } from '../controllers/AuthController.js';

export const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/logout', logout);
