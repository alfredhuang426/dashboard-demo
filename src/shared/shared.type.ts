export type Pagination = {
  category?: string;
  current_page?: number;
  has_next?: boolean;
  has_pre?: boolean;
  total_pages?: number;
};

export type User = {
  address?: string;
  email?: string;
  name?: string;
  tel?: string;
};

export type Methods =
  | "head"
  | "options"
  | "put"
  | "post"
  | "patch"
  | "delete"
  | "get";

export type MessageState = {
  type?: string;
  title?: string;
  text?: string;
};

export type MessageAction =
  | { type: "POST_MESSAGE"; payload: MessageState }
  | { type: "CLEAR_MESSAGE"; payload: MessageState };
