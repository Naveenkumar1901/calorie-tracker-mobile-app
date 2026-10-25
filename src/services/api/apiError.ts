import type { ProblemDetails } from '@/shared/types/api';

export type ApiErrorKind =
  | 'validation'
  | 'unauthorized'
  | 'forbidden'
  | 'notFound'
  | 'conflict'
  | 'tooManyRequests'
  | 'server'
  | 'network'
  | 'timeout'
  | 'unknown';

interface ApiErrorInit {
  kind: ApiErrorKind;
  status: number;
  message: string;
  problem?: ProblemDetails;
  fieldErrors?: Record<string, string[]>;
  cause?: unknown;
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number;
  readonly problem?: ProblemDetails;
  readonly fieldErrors?: Record<string, string[]>;

  constructor(init: ApiErrorInit) {
    super(init.message);
    this.name = 'ApiError';
    this.kind = init.kind;
    this.status = init.status;
    this.problem = init.problem;
    this.fieldErrors = init.fieldErrors;
    this.cause = init.cause;
  }

  isValidation(): boolean {
    return this.kind === 'validation';
  }
}

export const USER_FRIENDLY_MESSAGES: Record<ApiErrorKind, string> = {
  validation: 'Please correct the highlighted fields and try again.',
  unauthorized: 'Your session has expired. Please sign in again.',
  forbidden: "You don't have permission to perform this action.",
  notFound: 'The requested resource could not be found.',
  conflict: 'This action conflicts with the current state. Please refresh and try again.',
  tooManyRequests: 'Too many requests. Please slow down and try again.',
  server: 'Something went wrong on our end. Please try again shortly.',
  network: 'Network error. Please check your connection.',
  timeout: 'The request timed out. Please try again.',
  unknown: 'An unexpected error occurred.',
};
