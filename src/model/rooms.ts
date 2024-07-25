import { Categories } from "./categories";
import { Order } from "./orders";

export interface Rooms {
  ID: number;
  roomNumber: number;
  status: number; // 1 or 0
  categoryId: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  order: Order;
  category: Categories; // reference to Categories
}

export interface CreateRoomsRequest {
  rooms: Rooms;
}

export interface ListRoomsResponse {
  rooms: Rooms[];
}

export interface UpdateRoomsRequest {
  id: number;
  rooms: Rooms;
}
