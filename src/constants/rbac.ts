export const ROLES = ['Admin', 'Accountant', 'Viewer'] as const;
export type Role = (typeof ROLES)[number];

export const PERMISSIONS = ['invoice:read', 'invoice:create', 'invoice:update', 'invoice:delete'] as const;
export type Permission = (typeof PERMISSIONS)[number];

export const ROLE_PERMISSIONS: Record<Role, ReadonlySet<Permission>> = {
  Admin: new Set(PERMISSIONS),
  Accountant: new Set(['invoice:read', 'invoice:create', 'invoice:update']),
  Viewer: new Set(['invoice:read']),
};

