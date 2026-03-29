import type { Request, Response } from 'express';

export const listExperiences = (_req: Request, res: Response) => {
  res.status(200).json({ data: [] });
};
