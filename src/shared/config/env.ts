type AppEnv = 'development' | 'staging' | 'production';

interface EnvConfig {
  apiBaseUrl: string;
  signalRUrl: string;
  appEnv: AppEnv;
  isDev: boolean;
  isProd: boolean;
}

function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}. Check your .env file.`);
  }
  return value;
}

const appEnv = (process.env.EXPO_PUBLIC_APP_ENV ?? 'development') as AppEnv;

export const env: EnvConfig = {
  apiBaseUrl: required('EXPO_PUBLIC_API_BASE_URL', process.env.EXPO_PUBLIC_API_BASE_URL),
  signalRUrl: required('EXPO_PUBLIC_SIGNALR_URL', process.env.EXPO_PUBLIC_SIGNALR_URL),
  appEnv,
  isDev: appEnv === 'development',
  isProd: appEnv === 'production',
};
