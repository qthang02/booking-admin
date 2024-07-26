import { Avatar, Dropdown, MenuProps, Space } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHotel } from "@fortawesome/free-solid-svg-icons";

let navigation: NavigateFunction | ((arg0: string) => void);

export const Header = () => {
  navigation = useNavigate();
  const items: MenuProps["items"] = [
    {
      key: "2",
      label: (
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bolder",
          }}
        >
          Đăng nhập
        </span>
      ),
      onClick: () => navigation("/login"),
    },
    {
      key: "3",
      label: (
        <span
          style={{
            fontSize: "18px",
            fontWeight: "bolder",
          }}
        >
          Đăng xuất
        </span>
      ),
      onClick: () => navigation("/login"),
    },
  ];

  return (
    <Space
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: "80px",
        borderBottom: "#C7C8CC 1px solid",
        backgroundColor: "#FFFFFF",
        padding: "0 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "relative",
          left: "50px",
        }}
      >
        <FontAwesomeIcon
          icon={faHotel}
          style={{
            fontSize: "50px",
            color: "#663366",
            opacity: 0.2,
            position: "absolute",
            left: 0,
          }}
        />
        <span
          style={{
            color: "#663366",
            fontWeight: "bold",
            fontSize: "xx-large",
            whiteSpace: "nowrap",
            position: "relative",
            left: "10px",
            backgroundColor: "#FFFFFF",
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          Shelby Hotel
        </span>
      </div>

      <div style={{marginLeft: "-20px"}}>
      <span
        style={{
          color: "#663366",
          fontWeight: "bold",
          fontSize: "large",
          whiteSpace: "nowrap",

          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Lato', sans-serif",
        }}
      >
        SHELBY SAIGON CENTRE
      </span>
      </div>

      <Dropdown menu={{ items }} placement="bottomRight">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            backgroundColor: "whitesmoke",
            height: "40px",
            width: "86px",
            border: "gray 1px solid",
            borderRadius: "24px",
            padding: "5px",
            cursor: "pointer",
            marginRight: "70px",
          }}
        >
          <MenuOutlined />
          <Avatar size={35} icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </Space>
  );
};