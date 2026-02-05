import { z } from 'zod';

export const assignmentSchema = z.object({
  courseId: z.string(),
  title: z.string().min(3),
  dueDate: z.string()
});
