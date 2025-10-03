import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtPayload>(err: any, user: any): TUser {
    if (err) {
      throw err || new UnauthorizedException();
    }

    if (!user) {
      throw new UnauthorizedException('Authentication failed');
    }

    return user as TUser;
  }
}
