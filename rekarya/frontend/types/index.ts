export type Role = "MAHASISWA" | "UMKM" | "ADMIN";

export type ProductStatus = "PENDING" | "APPROVED" | "REJECTED";

export type MatchLabel =
  | "Sangat Cocok"
  | "Cocok"
  | "Cukup Sesuai"
  | "Kurang Sesuai";

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  username: string;
  email: string;
  role: Role;
};

export type Product = {
  id: string;
  title: string;
  category: string;
  description: string;
  mainProblem: string;
  problemDetail?: string;
  targetBusiness: string;
  mainFeatures: string;
  featureDetail?: string;
  technology: string;
  trainingDuration: string;
  mentoringMethod: string;
  price: number;
  screenshot?: string;
  status: ProductStatus;
  mahasiswa?: {
    fullName?: string;
    campus?: string;
    phone?: string;
  };
};

export type Recommendation = {
  productId: string;
  title: string;
  shortDescription: string;
  price: number;
  matchScore: number;
  matchLabel: MatchLabel;
  reasons: string[];
};