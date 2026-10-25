import axios from 'axios';

import { env } from '@/shared/config/env';

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});
