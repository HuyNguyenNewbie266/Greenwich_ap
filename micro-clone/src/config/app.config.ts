import { registerAs } from '@nestjs/config';

export interface AppConfig {
  name: string;
  port: number;
}

export default registerAs('app', (): AppConfig => ({
  name: process.env.APP_NAME ?? 'Greenwich Micro Clone',
  port: parseInt(process.env.PORT ?? '3100', 10),
}));
