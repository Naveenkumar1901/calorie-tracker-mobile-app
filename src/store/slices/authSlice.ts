import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface CurrentUser {
  id: string;
  email: string;
  displayName: string;
  mobile?: string;
  profileImage?: string | null;
}

export interface AuthState {
  accessToken: string | null;
  user: CurrentUser | null;
  status: 'unknown' | 'authenticated' | 'unauthenticated';
  isRestoring: boolean;
}

interface AuthSuccessPayload {
  accessToken: string;
  user: CurrentUser;
}

const initialState: AuthState = {
  accessToken: null,
  user: null,
  status: 'unknown',
  isRestoring: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSucceeded(state, action: PayloadAction<AuthSuccessPayload>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = 'authenticated';
      state.isRestoring = false;
    },
    userUpdated(state, action: PayloadAction<CurrentUser>) {
      state.user = action.payload;
    },
    authCleared(state) {
      state.accessToken = null;
      state.user = null;
      state.status = 'unauthenticated';
      state.isRestoring = false;
    },
    restorationFinished(state) {
      state.isRestoring = false;
      if (state.status === 'unknown') {
        state.status = 'unauthenticated';
      }
    },
  },
});

export const {
  authSucceeded,
  userUpdated,
  authCleared,
  restorationFinished,
} = authSlice.actions;

export const authReducer = authSlice.reducer;