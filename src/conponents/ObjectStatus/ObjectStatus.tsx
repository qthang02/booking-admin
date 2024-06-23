import {Tag} from "antd";
import * as React from "react";
import {ObjectRoomStatusUtils, RoomStatus} from "../../utils/type.ts";

const CustomTag = (title: string, color: string) => {
    return (
        <Tag
            color={color}
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                width: "100px",
                position: "absolute",
                top: 10,
                left: 55,
                zIndex: 10,
                padding: 8,
                borderRadius: 20,
            }}
        >
            {title}
        </Tag>
    );
};

type RoomStatusProps = {
    status: RoomStatus;
}

export const ObjectRoomStatus: React.FC<RoomStatusProps> = (props) => {
    if (ObjectRoomStatusUtils.isChecking(props.status)) {
        return CustomTag(ObjectRoomStatusUtils.humanizeStatus(props.status), "green")
    }

    if (ObjectRoomStatusUtils.isConfirmed(props.status)) {
        return CustomTag(ObjectRoomStatusUtils.humanizeStatus(props.status), "blue")
    }

    if (ObjectRoomStatusUtils.isPending(props.status)) {
        return CustomTag(ObjectRoomStatusUtils.humanizeStatus(props.status), "orange")
    }

    if (ObjectRoomStatusUtils.isCheckOut(props.status)) {
        return CustomTag(ObjectRoomStatusUtils.humanizeStatus(props.status), "magenta")
    }

    if (ObjectRoomStatusUtils.isEmplty(props.status)) {
        return CustomTag(ObjectRoomStatusUtils.humanizeStatus(props.status), "purple")
    }
}

