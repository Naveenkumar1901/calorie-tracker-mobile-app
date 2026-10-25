import { configureStore } from '@reduxjs/toolkit';

import { env } from '@/shared/config/env';

import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  devTools: env.isDev,
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type { RootState } from './rootReducer';
