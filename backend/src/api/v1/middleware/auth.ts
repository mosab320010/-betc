import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/env.js';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: 'Missing authorization header' });
    return;
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    jwt.verify(token, config.jwtSecret);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
