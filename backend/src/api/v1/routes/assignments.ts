import { Router } from 'express';
import { listAssignments } from '../controllers/AssignmentController.js';

export const assignmentsRouter = Router();

assignmentsRouter.get('/course/:courseId', listAssignments);
