import {Button, Card, Space, Typography} from "antd";
import {CustomerManagement} from "../components/customerManagement.tsx";

export const Customer = () => {
    return (
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
                    Quản lý khách hàng
                </Typography.Title>

                <Button type="primary" size={"middle"}>
                    Thêm khách hàng
                </Button>
            </Space>
            <CustomerManagement />
        </Card>
    )
}