import path from 'node:path';
import dotenv from 'dotenv';
import type { AppConfig, Environment } from '../types/env';

const VALID_ENVIRONMENTS: Environment[] = ['dev', 'staging', 'prod'];

function resolveEnvironment(): Environment {
  const env = (process.env.ENV ?? 'dev').toLowerCase();
  if (!VALID_ENVIRONMENTS.includes(env as Environment)) {
    throw new Error(
      `Ambiente "${env}" inválido. Use um dos seguintes: ${VALID_ENVIRONMENTS.join(', ')}`,
    );
  }
  return env as Environment;
}

function loadEnvFile(env: Environment): void {
  const envFilePath = path.resolve(process.cwd(), 'config', 'environments', `.env.${env}`);
  dotenv.config({ path: envFilePath });
  dotenv.config();
}

function requireEnvVar(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

function buildConfig(): AppConfig {
  const env = resolveEnvironment();
  loadEnvFile(env);

  return {
    env,
    baseURL: requireEnvVar('BASE_URL', 'https://example.com'),
    apiURL: requireEnvVar('API_URL', 'https://api.example.com'),
    timeout: Number(process.env.DEFAULT_TIMEOUT ?? 30_000),
    headless: (process.env.HEADLESS ?? 'true') === 'true',
    credentials: {
      username: requireEnvVar('TEST_USERNAME', ''),
      password: requireEnvVar('TEST_PASSWORD', ''),
    },
  };
}

export const config: AppConfig = buildConfig();
