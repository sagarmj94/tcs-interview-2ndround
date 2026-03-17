import type { Permission, Role } from '../constants/rbac';
import { ROLE_PERMISSIONS } from '../constants/rbac';

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role].has(permission);
}

