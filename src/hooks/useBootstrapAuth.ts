import { useEffect, useState } from 'react';
import { authStore } from '../store/authStore';
import { apiMe } from '../api/auth';

export function useBootstrapAuth() {
  const [ready, setReady] = useState(false);
  const setUser = authStore((s) => s.setUser);
  const setAccessToken = authStore((s) => s.setAccessToken);
  const logout = authStore((s) => s.logout);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const token = authStore.getState().accessToken;
        if (!token) return;
        const user = await apiMe();
        setUser(user);
      } catch {
        // Token invalid/expired; clear persisted auth.
        logout();
        setAccessToken(null);
      }
    }

    run()
      .catch(() => {
        // noop
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [logout, setAccessToken, setUser]);

  return { ready };
}
 
