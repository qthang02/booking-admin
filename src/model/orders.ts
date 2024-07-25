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
}