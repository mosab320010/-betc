import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(2),
  role: z.enum(['student', 'teacher', 'admin', 'parent'])
});
