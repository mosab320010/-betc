import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/env.js';
import { v1Router } from './api/v1/routes/index.js';
import { errorHandler } from './api/v1/middleware/errorHandler.js';

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.corsOrigins }));
  app.use(express.json());

  app.use('/api/v1', v1Router);

  app.use(errorHandler);

  return app;
};
