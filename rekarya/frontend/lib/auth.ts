export type UserRole = "MAHASISWA" | "UMKM" | "ADMIN";

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function saveRole(role: UserRole) {
  localStorage.setItem("role", role);
}

export function getRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role") as UserRole | null;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function isLoggedIn() {
  return !!getToken();
}

export function getDashboardPath(role: UserRole) {
  switch (role) {
    case "MAHASISWA":
      return "/mahasiswa/dashboard";
    case "UMKM":
      return "/umkm/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    default:
      return "/login";
  }
}