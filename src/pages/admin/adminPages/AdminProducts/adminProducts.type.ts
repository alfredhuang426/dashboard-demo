export type Pagination = {
  category?: string;
  current_page?: number;
  has_next?: boolean;
  has_pre?: boolean;
  total_pages?: number;
};

export type Product = {
  category?: string;
  content?: string;
  description?: string;
  id?: string;
  imageUrl?: string;
  is_enabled?: number;
  num?: number;
  origin_price?: number;
  price?: number;
  title?: string;
  unit?: string;
};
