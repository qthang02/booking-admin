export interface Bookings {
    room_type: string,
    room_number: number,
    room_id: number,
    user_id: number,
    status: "Pending" | "Confirmed" | "Canceled"; // Union type
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}
