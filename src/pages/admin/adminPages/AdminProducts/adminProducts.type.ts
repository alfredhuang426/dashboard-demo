import { Pagination } from "../../../../shared/shared.type";

export type Product = {
  category: string;
  content?: string;
  description?: string;
  id?: string;
  imageUrl?: string;
  is_enabled?: number;
  origin_price: number;
  price: number;
  title: string;
  unit: string;
};

export type ProductData = {
  products?: Product[];
  pagination?: Pagination;
};
