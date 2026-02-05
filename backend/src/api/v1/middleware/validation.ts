import type { Request, Response, NextFunction } from 'express';

export const validateRequest = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};
