import {Tag} from "antd";
import * as React from "react";
import {ObjectRoomStatusUtils, RoomStatus} from "../../utils/type.ts";

const CustomTag = (title: string, color: string) => {
    return (
        <Tag
            color={color}
            style={{
                position: "absolute",
                top: 20,
                left: 20,
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

