import {Card} from "antd";
import {RoomManagement} from "../components/roomManagement.tsx";

export const Room = () => {
    return (
        <>
            <Card
                style={{
                    border: "none",
                    paddingLeft: "50px",
                    paddingRight: "50px"    
                }}
            >
                <RoomManagement />
            </Card>
        </>
    )
}