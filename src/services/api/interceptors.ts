import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { authStorage } from '@/services/auth/tokenStorage';
import { queryClient } from '@/shared/config/queryClient';
import type { ProblemDetails } from '@/shared/types/api';
import { authCleared } from '@/store/slices/authSlice';
import type { AppStore } from '@/store/store';

import { ApiError, USER_FRIENDLY_MESSAGES, type ApiErrorKind } from './apiError';
import { axiosClient } from './axiosClient';

interface RetryConfig extends InternalAxiosRequestConfig {
  _skipAuthRefresh?: boolean;
}

const LOGIN_URL = '/UserManagement/Login';

function kindFromStatus(status: number): ApiErrorKind {
  switch (status) {
    case 400:
    case 422:
      return 'validation';
    case 401:
      return 'unauthorized';
    case 403:
      return 'forbidden';
    case 404:
      return 'notFound';
    case 409:
      return 'conflict';
    case 429:
      return 'tooManyRequests';
    default:
      return status >= 500 ? 'server' : 'unknown';
  }
}

function toApiError(err: AxiosError): ApiError {
  if (err.code === 'ECONNABORTED') {
    return new ApiError({ kind: 'timeout', status: 0, message: USER_FRIENDLY_MESSAGES.timeout, cause: err });
  }
  if (!err.response) {
    return new ApiError({ kind: 'network', status: 0, message: USER_FRIENDLY_MESSAGES.network, cause: err });
  }
  const status = err.response.status;
  const kind = kindFromStatus(status);
  const problem = (err.response.data ?? undefined) as ProblemDetails | undefined;
  const message = problem?.message ?? problem?.title ?? problem?.detail ?? USER_FRIENDLY_MESSAGES[kind];
  return new ApiError({ kind, status, message, problem, fieldErrors: problem?.errors, cause: err });
}

let installed = false;

export function installInterceptors(store: AppStore): void {
  if (installed) return;
  installed = true;

  axiosClient.interceptors.request.use((config) => {
    const token = store.getState().auth.accessToken;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const request = error.config as RetryConfig | undefined;
      const isLoginCall = (request?.url ?? '').includes(LOGIN_URL);
      if (error.response?.status === 401 && !request?._skipAuthRefresh && !isLoginCall) {
        await authStorage.clear();
        store.dispatch(authCleared());
        queryClient.clear();
      }
      return Promise.reject(toApiError(error));
    },
  );
}

declare module 'axios' {
  interface AxiosRequestConfig {
    _skipAuthRefresh?: boolean;
  }
  interface InternalAxiosRequestConfig {
    _skipAuthRefresh?: boolean;
  }
}
