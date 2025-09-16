import { EnvConfig } from '@/types';

/**
 * Validates and returns environment configuration
 * @throws Error if required environment variables are missing
 */
export function getEnvConfig(): EnvConfig {
  const openaiKey = process.env.OPENAI_API_KEY;
  const polygonKey = process.env.POLYGON_API_KEY;

  if (!openaiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }

  if (!polygonKey) {
    throw new Error('POLYGON_API_KEY environment variable is required');
  }

  return {
    OPENAI_API_KEY: openaiKey,
    POLYGON_API_KEY: polygonKey,
  };
}

/**
 * Checks if environment is properly configured
 */
export function isEnvConfigured(): boolean {
  try {
    getEnvConfig();
    return true;
  } catch {
    return false;
  }
}

/**
 * Gets the base URL for different environments
 */
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === 'production') {
    return process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://localhost:3000';
  }
  return 'http://localhost:3000';
}