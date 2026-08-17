export type Environment = 'dev' | 'staging' | 'prod';

export interface AppConfig {
  env: Environment;
  baseURL: string;
  apiURL: string;
  timeout: number;
  headless: boolean;
  credentials: {
    username: string;
    password: string;
  };
}
