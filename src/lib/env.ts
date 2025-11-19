// lib/env.ts
import { z } from 'zod';

const envSchema = z.object({
  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  
  // Authentication
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(1),
  
  // Database
  DATABASE_URL: z.string().min(1),
  
  // Email
  RESEND_API_KEY: z.string().min(1),
  FROM_EMAIL: z.string().email(),
  
  // AI Services
  AI_SERVICE_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
});

export const env = envSchema.parse(process.env);