import { useMutation, useQuery } from '@tanstack/react-query';
import { apiLogin, apiMe, apiSignup } from '../api/auth';
import { authStore } from '../store/authStore';
import type { LoginRequest, SignupRequest } from '../types/auth';

export function useAuthUser() {
  const accessToken = authStore((s) => s.accessToken);
  const setUser = authStore((s) => s.setUser);

  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const user = await apiMe();
      setUser(user);
      return user;
    },
    enabled: Boolean(accessToken),
    staleTime: 60_000,
  });
}

export function useLogin() {
  const setAccessToken = authStore((s) => s.setAccessToken);
  const setUser = authStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: LoginRequest) => apiLogin(payload),
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      const user = await apiMe();
      setUser(user);
    },
  });
}

export function useSignup() {
  const setAccessToken = authStore((s) => s.setAccessToken);
  const setUser = authStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: SignupRequest) => apiSignup(payload),
    onSuccess: async (data) => {
      setAccessToken(data.accessToken);
      const user = await apiMe();
      setUser(user);
    },
  });
}

