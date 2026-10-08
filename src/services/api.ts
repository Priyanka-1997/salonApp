import { API_BASE_URL } from '../utils/constants';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function apiRequest<T>(
  path: string,
  options: { method?: HttpMethod; body?: unknown; headers?: Record<string, string> } = {},
): Promise<T> {
  const { method = 'GET', body, headers = {} } = options;
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }

  return (await res.json()) as T;
}
