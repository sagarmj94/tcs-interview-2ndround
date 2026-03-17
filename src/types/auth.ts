import type { Role } from '../constants/rbac';

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type SignupRequest = {
  email: string;
  password: string;
};

export type AuthTokenResponse = {
  accessToken: string;
};

