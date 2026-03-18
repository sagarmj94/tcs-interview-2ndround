import type { Role } from '../constants/rbac';

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
  permissions: string[];
  createdAt: number;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
  // Backend supports optional role, defaults to Viewer if omitted.
  role?: Role;
};

export type AuthTokenResponse = {
  token: string;
  user: AuthUser;
};

