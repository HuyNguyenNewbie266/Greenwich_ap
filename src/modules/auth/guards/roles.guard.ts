import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { ROLES_KEY } from '../../../common/decorators/roles.decorator';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [ctx.getHandler(), ctx.getClass()],
    );

    // If no roles are required, allow access
    if (!requiredRoles || requiredRoles.length === 0) return true;

    const req = ctx.switchToHttp().getRequest<Request & { user?: User }>();

    const user = req.user;

    // Check if user exists and has a role
    if (!user || !user.role || !user.role.name) {
      return false;
    }

    const userRoleName = user.role.name.toLowerCase();
    const requiredRolesLower = requiredRoles.map((r) => r.toLowerCase());
    const hasPermission = requiredRolesLower.includes(userRoleName);

    return hasPermission;
  }
}
