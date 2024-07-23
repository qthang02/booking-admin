export type RoomStatus =
    "CONFIRMED" |
    "PENDING" |
    "CHECKING" |
    "CHECKOUT" |
    "EMPTY";


export const ObjectRoomStatusUtils = {
    isConfirmed: (status: RoomStatus) => status === "CONFIRMED",
    isPending: (status: RoomStatus) => status === "PENDING",
    isChecking: (status: RoomStatus) => status === "CHECKING",
    isCheckOut: (status: RoomStatus) => status === "CHECKOUT",
    isEmplty: (status: RoomStatus) => status === "EMPTY",

    humanizeStatus: (status: RoomStatus) => {
        switch (status) {
            case "CONFIRMED": return "Đã xác nhận";
            case "CHECKING": return "Đã checking";
            case "PENDING": return "Đang chờ";
            case "CHECKOUT": return "Đã Checkout"
            case "EMPTY": return "Đang trống"
        }
    },
}


export type EventClick =
    "EVT_NONE" |
    "EVT_CREATE" |
    "EVT_DELETE" |
    "EVT_UPDATE"