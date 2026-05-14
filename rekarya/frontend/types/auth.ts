export type Role = "MAHASISWA" | "UMKM" | "ADMIN";

export interface AuthUser {
  id: string;
  username: string;
  email: string;
  role: Role;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AuthUser;
  };
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  role: Exclude<Role, "ADMIN">;
}