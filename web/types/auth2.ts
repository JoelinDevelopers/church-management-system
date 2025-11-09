import { CurrentLevel } from "./login";

// types/auth2.ts

export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";
export type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED" | "PENDING";
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  status: Status;
  isVerified: boolean;
  image: string | null;
  nin: string | null;
  churchId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;

  session: SessionInfo;
  subdomainUrl?: string | null;
}

export interface SessionInfo {
  expiresAt: string;
  refreshExpiresAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
  subdomain?: string;
}

export interface LoginResult {
  success: boolean;
  data?: LoginResponse;
  error?: string;
}

export interface DeviceInfo {
  userAgent: string;
  platform: string;
  device?: string;
  ipAddress?: string;
}

export interface AuthStore {
  user: User | null;

  refreshToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;

  setTokens: (accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<User>) => void;
}

export interface ApiError {
  message: string;
  code: string;
  status?: string;
}

export interface LoginError extends Error {
  code?: string;
  status?: number;
}
