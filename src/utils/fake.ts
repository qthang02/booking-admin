import {RoomStatus} from "./type.ts";

export const GetRandomIntInclusive = (min: number, max: number): number =>  {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);

    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export const GetRoomStatusFake = (): RoomStatus => {
    const num = GetRandomIntInclusive(0, 4);
    const status: RoomStatus[] = ["CHECKING", "EMPTY", "CHECKOUT", "PENDING", "CONFIRMED"];

    return status[num];
}