export const apiBaseUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

export const fetchJson = async <T>(path: string): Promise<T> => {
  const res = await fetch(`${apiBaseUrl}${path}`);
  if (!res.ok) {
    throw new Error('Request failed');
  }
  return res.json() as Promise<T>;
};
