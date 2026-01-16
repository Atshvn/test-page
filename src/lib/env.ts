import { z } from 'zod';

// ==========================================
// SERVER-ONLY CONFIG (Không expose ra client)
// ==========================================

const serverConfigSchema = z.object({
  // API Endpoints
  API_ENDPOINT: z.string().url(),
  API_ENDPOINT_TRACKING: z.string().url().optional(),
  API_ENDPOINT_UPLOAD: z.string().url().optional(),
  
  // API Keys (PRIVATE - không bao giờ expose)
  API_KEY: z.string().min(1),
  X_API_KEY: z.string().optional(),
  API_TOKEN: z.string().optional(),
  CLIENT_ID: z.string().optional(),
});

const serverConfig = serverConfigSchema.safeParse({
  API_ENDPOINT: process.env.API_ENDPOINT,
  API_ENDPOINT_TRACKING: process.env.API_ENDPOINT_TRACKING,
  API_ENDPOINT_UPLOAD: process.env.API_ENDPOINT_UPLOAD,
  API_KEY: process.env.API_KEY,
  X_API_KEY: process.env.X_API_KEY,
  API_TOKEN: process.env.API_TOKEN,
  CLIENT_ID: process.env.CLIENT_ID,
});

if (!serverConfig.success) {
  console.error('Server config validation failed:', serverConfig.error.issues);
  throw new Error('Server environment variables are not properly configured.');
}

export const env = serverConfig.data;

// ==========================================
// PUBLIC CONFIG (Có thể expose ra client)
// ==========================================

const publicConfigSchema = z.object({
  CDN_URL: z.string().url(),
  CDN_URL_V2: z.string().url().optional(),
  APP_URL: z.string().url(),
  GROUP_ID: z.string(),
});

const publicConfig = publicConfigSchema.safeParse({
  CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
  CDN_URL_V2: process.env.NEXT_PUBLIC_CDN_URL_V2,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  GROUP_ID: process.env.NEXT_PUBLIC_GROUP_ID,
});

if (!publicConfig.success) {
  console.error('Public config validation failed:', publicConfig.error.issues);
  throw new Error('Public environment variables are not properly configured.');
}

export const publicEnv = publicConfig.data;
