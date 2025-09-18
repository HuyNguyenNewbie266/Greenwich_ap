import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_SECRET ?? 'your-super-secret-key-here',
    signOptions: {
      expiresIn: process.env.JWT_EXPIRATION || '7d',
    },
  }),
);
