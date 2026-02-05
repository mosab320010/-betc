import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export type AuthPayload = {
  userId: string;
  role: 'student' | 'teacher' | 'admin';
};

export const signAccessToken = (payload: AuthPayload) => {
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '15m' });
};
