import express from 'express';
import helmet from 'helmet';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';
import { getBackendTarget } from './config.js';

dotenv.config();

const app = express();

app.use(helmet());

const backendTarget = getBackendTarget(process.env);

app.use(
  '/api',
  createProxyMiddleware({
    target: backendTarget,
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' }
  })
);

app.listen(3000, () => {
  console.log('API Gateway listening on port 3000');
});
