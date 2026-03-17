import { hasPermission } from '../rbac';

describe('hasPermission', () => {
  test('Admin has all invoice permissions', () => {
    expect(hasPermission('Admin', 'invoice:read')).toBe(true);
    expect(hasPermission('Admin', 'invoice:create')).toBe(true);
    expect(hasPermission('Admin', 'invoice:update')).toBe(true);
    expect(hasPermission('Admin', 'invoice:delete')).toBe(true);
  });

  test('Accountant cannot delete', () => {
    expect(hasPermission('Accountant', 'invoice:read')).toBe(true);
    expect(hasPermission('Accountant', 'invoice:create')).toBe(true);
    expect(hasPermission('Accountant', 'invoice:update')).toBe(true);
    expect(hasPermission('Accountant', 'invoice:delete')).toBe(false);
  });

  test('Viewer is read-only', () => {
    expect(hasPermission('Viewer', 'invoice:read')).toBe(true);
    expect(hasPermission('Viewer', 'invoice:create')).toBe(false);
    expect(hasPermission('Viewer', 'invoice:update')).toBe(false);
    expect(hasPermission('Viewer', 'invoice:delete')).toBe(false);
  });
});

