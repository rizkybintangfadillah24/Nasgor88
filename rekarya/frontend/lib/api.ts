const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiOptions extends RequestInit {
  token?: string;
}

export async function apiFetch(endpoint: string, options: ApiOptions = {}) {
  const { token, headers, ...restOptions } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers || {}),
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Terjadi kesalahan');
  }

  return result;
}

export { API_BASE_URL };