import type { Request, Response } from 'express';
import { courses } from '../../../services/courseService.js';

export const listCourses = (_req: Request, res: Response) => {
  res.status(200).json({ data: courses.list() });
};

export const getCourse = (req: Request, res: Response) => {
  const course = courses.get(req.params.courseId);
  if (!course) {
    res.status(404).json({ message: 'Course not found' });
    return;
  }
  res.status(200).json({ data: course });
};
