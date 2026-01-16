import { z } from 'zod';

/**
 * Public configuration that can be safely used in client components
 * These values are embedded in the client bundle
 */

const publicConfigSchema = z.object({
  CDN_URL: z.string().url(),
  CDN_URL_V2: z.string().url().optional(),
  APP_URL: z.string().url(),
  GROUP_ID: z.string(),
});

const parsed = publicConfigSchema.safeParse({
  CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
  CDN_URL_V2: process.env.NEXT_PUBLIC_CDN_URL_V2,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  GROUP_ID: process.env.NEXT_PUBLIC_GROUP_ID,
});

if (!parsed.success) {
  console.error('Public config validation failed:', parsed.error.issues);
  throw new Error('Public environment variables are not properly configured.');
}

export const config = parsed.data;
