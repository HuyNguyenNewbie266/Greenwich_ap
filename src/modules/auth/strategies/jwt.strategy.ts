import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/entities/user.entity';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    const secret = process.env.JWT_SECRET ?? 'your-super-secret-key-here';

    if (!secret) {
      throw new Error('JWT_SECRET environment variable is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    try {
      if (!payload.sub) {
        throw new UnauthorizedException('Invalid token: missing user ID');
      }

      if (!payload.email) {
        throw new UnauthorizedException('Invalid token: missing email');
      }

      const user = await this.authService.validateUserByJwt(payload);

      if (!user.role) {
        throw new UnauthorizedException('User role not found');
      }

      return user;
    } catch (err: unknown) {
      if (err instanceof UnauthorizedException) {
        throw err;
      }

      if (err instanceof Error) {
        throw new UnauthorizedException(
          `Token validation failed: ${err.message}`,
        );
      }

      throw new UnauthorizedException('Invalid token');
    }
  }
}
