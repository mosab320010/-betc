import type { Request, Response } from 'express';
import { signAccessToken } from '../../../services/authService.js';

export const login = (_req: Request, res: Response) => {
  const token = signAccessToken({ userId: 'demo-user', role: 'student' });
  res.status(200).json({ token });
};

export const logout = (_req: Request, res: Response) => {
  res.status(204).send();
};
