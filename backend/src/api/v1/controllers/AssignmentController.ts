import type { Request, Response } from 'express';
import { assignments } from '../../../services/assignmentService.js';

export const listAssignments = (req: Request, res: Response) => {
  const data = assignments.listByCourse(req.params.courseId);
  res.status(200).json({ data });
};
