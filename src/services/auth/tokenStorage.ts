import * as SecureStore from 'expo-secure-store';

import type { CurrentUser } from '@/store/slices/authSlice';

const SESSION_KEY = 'service.auth.session';

export interface StoredSession {
  accessToken: string;
  expiresOn: string;
  user: CurrentUser;
}

const parseExpiry = (value: string) => Date.parse(value.replace(/(\.\d{3})\d+/, '$1'));

const isExpired = (session: StoredSession) => {
  const expires = parseExpiry(session.expiresOn);
  return Number.isNaN(expires) || expires <= Date.now();
};

export const authStorage = {
  async save(session: StoredSession): Promise<void> {
    try {
      const slim = { ...session, user: { ...session.user, profileImage: null } };
      await SecureStore.setItemAsync(SESSION_KEY, JSON.stringify(slim));
    } catch {}
  },
  async get(): Promise<StoredSession | null> {
    try {
      const raw = await SecureStore.getItemAsync(SESSION_KEY);
      if (!raw) return null;
      const session = JSON.parse(raw) as StoredSession;
      return session?.accessToken && session.user && !isExpired(session) ? session : null;
    } catch {
      return null;
    }
  },
  async clear(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(SESSION_KEY);
    } catch {}
  },
};
