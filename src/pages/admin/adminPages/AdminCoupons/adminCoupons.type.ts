import { Pagination } from "../../../../shared/shared.type";
import dayjs, { Dayjs } from 'dayjs';

export type Coupon = {
  code?: string;
  due_date?: number | Dayjs;
  id?: string;
  is_enabled?: number;
  num?: number;
  percent: number;
  title: string;
};

export type CouponData = {
  coupons?: Coupon[];
  pagination?: Pagination;
};
