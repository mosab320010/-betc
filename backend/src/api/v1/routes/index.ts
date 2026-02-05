import { Router } from 'express';
import { authRouter } from './auth.js';
import { coursesRouter } from './courses.js';
import { assignmentsRouter } from './assignments.js';
import { aiRouter } from './ai.js';
import { blockchainRouter } from './blockchain.js';
import { xrRouter } from './xr.js';

export const v1Router = Router();

v1Router.use('/auth', authRouter);
v1Router.use('/courses', coursesRouter);
v1Router.use('/assignments', assignmentsRouter);
v1Router.use('/ai', aiRouter);
v1Router.use('/blockchain', blockchainRouter);
v1Router.use('/xr', xrRouter);
