import { Pagination, User } from "../../../../shared/shared.type";
import { Product } from "../AdminProducts/adminProducts.type";

export type Order = {
  create_at?: number;
  id?: string;
  is_paid?: boolean;
  num?: number;
  products?: { [key: string]: Product };
  total?: number;
  user?: User;
  message?:string;
};

export type OrderData = {
  orders?: Order[];
  pagination?: Pagination;
};
