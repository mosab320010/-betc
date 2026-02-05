import { Router } from 'express';
import { getCourse, listCourses } from '../controllers/CourseController.js';

export const coursesRouter = Router();

coursesRouter.get('/', listCourses);
coursesRouter.get('/:courseId', getCourse);
