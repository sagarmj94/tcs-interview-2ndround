import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { env } from './env';
import { authStore } from '../store/authStore';

type RefreshResponse = { accessToken: string };

const baseURL = env.apiBaseUrl ?? '';

function createHttpClient(): AxiosInstance {
  const instance = axios.create({
    baseURL,
    withCredentials: true, // refresh token via cookie
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = authStore.getState().accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  let refreshPromise: Promise<string> | null = null;

  async function refreshAccessToken(): Promise<string> {
    if (!refreshPromise) {
      refreshPromise = instance
        .post<RefreshResponse>('/api/auth/refresh', undefined, {
          // Refresh uses cookie; no auth header required, but harmless if present.
          headers: { Authorization: undefined },
        })
        .then((res) => res.data.accessToken)
        .finally(() => {
          refreshPromise = null;
        });
    }
    return refreshPromise;
  }

  instance.interceptors.response.use(
    (res) => res,
    async (error: AxiosError) => {
      const original = error.config as (AxiosRequestConfig & { _retry?: boolean }) | undefined;
      const status = error.response?.status;
      if (!original || status !== 401 || original._retry) {
        return Promise.reject(error);
      }

      original._retry = true;

      try {
        const newToken = await refreshAccessToken();
        authStore.getState().setAccessToken(newToken);
        original.headers = original.headers ?? {};
        (original.headers as Record<string, string>).Authorization = `Bearer ${newToken}`;
        return instance.request(original);
      } catch (refreshErr) {
        authStore.getState().logout();
        return Promise.reject(refreshErr);
      }
    }
  );

  return instance;
}

export const http = createHttpClient();

