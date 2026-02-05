import { Router } from 'express';
import { listExperiences } from '../controllers/XRController.js';

export const xrRouter = Router();

xrRouter.get('/experiences', listExperiences);
