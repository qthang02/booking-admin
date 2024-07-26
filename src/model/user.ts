export interface User {
  id: number;
  username: string;
  phone: number;
  address: string;
  email: string;
  role: "customer" | "staff" | "admin"; // Union type
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

export interface CreateUserRequest {
  user: User
}

export interface ListUsersResponse {
  data: User[]
  total: number;
  paging: number;
}

export interface UpdateUserRequest {
  id: number;
  user: User;
}