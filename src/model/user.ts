export interface users {
  ID: number;
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
  ID: number;
  username: string;
  phone: number;
  address: string;
  email: string;
  role: "customer" | "staff" | "admin";
  password: string,
}

export interface ListUsersResponse {
  data: users[]
}