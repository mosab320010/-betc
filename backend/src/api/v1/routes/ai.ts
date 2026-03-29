import { Router } from 'express';
import { summarize } from '../controllers/AIController.js';

export const aiRouter = Router();

aiRouter.post('/summarize', summarize);
