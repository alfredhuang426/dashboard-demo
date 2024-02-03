import { Pagination } from "../../../../shared/shared.type";

export type Coupon = {
  code?: string;
  due_date?: number;
  id?: string;
  is_enabled?: number;
  num?: number;
  percent?: number;
  title: string;
};

export type CouponData = {
  coupons?: Coupon[];
  pagination?: Pagination;
};
