export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  price: number;
  status: "PENDING" | "APPROVED" | "REJECTED";
  screenshot?: string;
}