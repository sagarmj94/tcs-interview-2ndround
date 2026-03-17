import type { AuthTokenResponse, AuthUser, LoginRequest, SignupRequest } from '../types/auth';
import { http } from './http';

export async function apiSignup(payload: SignupRequest): Promise<AuthTokenResponse> {
  const res = await http.post<AuthTokenResponse>('/api/auth/signup', payload);
  return res.data;
}

export async function apiLogin(payload: LoginRequest): Promise<AuthTokenResponse> {
  const res = await http.post<AuthTokenResponse>('/api/auth/login', payload);
  return res.data;
}

export async function apiMe(): Promise<AuthUser> {
  const res = await http.get<AuthUser>('/api/auth/me');
  return res.data;
}

