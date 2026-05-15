const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
  isFormData?: boolean;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token, isFormData = false } = options;

  const headers: HeadersInit = {};

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body
      ? isFormData
        ? (body as BodyInit)
        : JSON.stringify(body)
      : undefined,
  });

  const result = await response.json();

  if (!response.ok || result.success === false) {
    throw new Error(result.message || "Terjadi kesalahan pada request API");
  }

  return result;
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rekarya_token");
}

export function setToken(token: string) {
  localStorage.setItem("rekarya_token", token);
}

export function removeToken() {
  localStorage.removeItem("rekarya_token");
}