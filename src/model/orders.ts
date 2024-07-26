import { Rooms } from "./rooms";
import { User } from "./user";

export interface Order {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  guestNumber: number;
  price: number;
  description: string;
  checkin: string;
  checkout: string;
  categoryType: number;
  roomNumber: number;
  userID: number;
  user: User;
  room: Rooms
}

export interface CreateOrdersRequest {
  orders: Order;
}

export interface ListOrdersResponse {
  Orders: Order[];
  Paging: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface UpdateOrdersRequest {
  id: number;
  orders: Order;
}
