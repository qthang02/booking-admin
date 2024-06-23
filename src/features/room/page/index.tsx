import {Button, Card, Space, Typography} from "antd";
import {RoomManagement} from "../components/roomManagement";

export const Room = () => {
    return (
        <>
            <Card
                style={{
                    border: "none",
                }}
            >
                <Space
                    style={{
                        marginBottom: 20,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}
                >
                    <Typography.Title
                        style={{
                            fontSize: 25
                        }}
                    >
                        Quản lý phòng
                    </Typography.Title>

                    <Button type="primary" size={"middle"}>
                        Thêm phòng
                    </Button>
                </Space>
                <RoomManagement />
            </Card>
        </>
    )
}