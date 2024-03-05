import { Pagination, User } from "../../../../shared/shared.type";
import { Product } from "../AdminProducts/adminProducts.type";

export type Order = {
  create_at?: number;
  id?: string;
  is_paid?: boolean;
  num?: number;
  products?: {
    [key: string]: {
      final_total: number;
      id: string;
      product: Product;
      product_id: string;
      qty: number;
      total: number;
    };
  };
  total?: number;
  user?: User;
  message?: string;
};

export type OrderData = {
  orders?: Order[];
  pagination?: Pagination;
};
