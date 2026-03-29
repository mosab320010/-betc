import { fetchJson } from './api';

export const login = async () => {
  return fetchJson<{ token: string }>('/auth/login');
};
