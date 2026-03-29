import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().default('4000'),
  CORS_ORIGINS: z.string().default('http://localhost:5173'),
  JWT_SECRET: z.string().default('change-me')
});

const parsed = envSchema.parse(process.env);

export const config = {
  port: Number(parsed.PORT),
  corsOrigins: parsed.CORS_ORIGINS.split(',').map((origin) => origin.trim()),
  jwtSecret: parsed.JWT_SECRET
};
