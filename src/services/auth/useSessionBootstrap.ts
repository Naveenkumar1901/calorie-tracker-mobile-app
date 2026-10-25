import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { authSucceeded, restorationFinished } from '@/store/slices/authSlice';

import { authStorage } from './tokenStorage';

export function useSessionBootstrap(): void {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let cancelled = false;
    authStorage.get().then(async (session) => {
      if (cancelled) return;
      if (!session) {
        await authStorage.clear();
        dispatch(restorationFinished());
        return;
      }
      dispatch(authSucceeded({ accessToken: session.accessToken, user: session.user }));
    });
    return () => {
      cancelled = true;
    };
  }, [dispatch]);
}
