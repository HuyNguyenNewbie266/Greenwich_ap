import { SetMetadata } from '@nestjs/common';
import { StaffRole } from '../../modules/staff/entities/staff_role.entity';

export const STAFF_ROLES_KEY = 'staff_roles';
export const StaffRoles = (...roles: StaffRole['role'][]) =>
  SetMetadata(STAFF_ROLES_KEY, roles);
