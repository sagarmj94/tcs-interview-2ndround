import { useEffect, useState } from 'react';
import { authStore } from '../store/authStore';

export function useBootstrapAuth() {
  const [ready, setReady] = useState(false);
  const setUser = authStore((s) => s.setUser);

  useEffect(() => {
    let cancelled = false;

    // For this assignment we keep bootstrap simple:
    // - If there is already a user in the store, respect it.
    // - Otherwise, just mark the app as ready and let the login/signup
    //   flows handle authentication and token refresh.
    if (!cancelled) {
      const existingUser = authStore.getState().user;
      if (existingUser) {
        setUser(existingUser);
      }
      setReady(true);
    }

    return () => {
      cancelled = true;
    };
  }, [setUser]);

  return { ready };
}
 
