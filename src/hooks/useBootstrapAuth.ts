import { useEffect, useState } from 'react';
import { http } from '../api/http';
import { authStore } from '../store/authStore';
import { apiMe } from '../api/auth';

type RefreshResponse = { accessToken: string };

export function useBootstrapAuth() {
  const [ready, setReady] = useState(false);
  const setAccessToken = authStore((s) => s.setAccessToken);
  const setUser = authStore((s) => s.setUser);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const existing = authStore.getState().accessToken;
      if (existing) {
        if (!cancelled) setReady(true);
        return;
      }

      try {
        const res = await http.post<RefreshResponse>('/api/auth/refresh');
        setAccessToken(res.data.accessToken);
        const user = await apiMe();
        setUser(user);
      } catch {
        // Ignore: user will go to login for private routes.
      } finally {
        if (!cancelled) setReady(true);
      }
    }

    void run();

    return () => {
      cancelled = true;
    };
  }, [setAccessToken, setUser]);

  return { ready };
}

