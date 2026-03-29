import type { Request, Response } from 'express';

export const summarize = (_req: Request, res: Response) => {
  res.status(200).json({ summary: 'AI summary placeholder' });
};
