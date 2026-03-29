import type { Request, Response, NextFunction } from 'express';

export const enforceSecurity = (_req: Request, _res: Response, next: NextFunction) => {
  next();
};
