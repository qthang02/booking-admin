import {
  AppstoreOutlined,
  FileTextOutlined,
  HomeOutlined,
  IdcardOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Row, theme } from "antd";
import { Link, Outlet } from "react-router-dom";

import { Header } from "./header";
import { useState } from "react";

const { Content, Sider } = Layout;

type MenuItem = {
  key: number;
  label: React.ReactNode;
  link?: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
};

const buildMenuItem = ({
  key,
  label,
  link,
  icon,
  children,
}: {
  key: string;
  label: React.ReactNode;
  link: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
}): MenuItem => {
  const item = {
    key,
    label,
    link,
    icon,
    children,
  } as MenuItem;
  const hasChildren = children && children.length > 0;

  // Leaf item
  if (link && !hasChildren) {
    item.label = <Link to={link}>{label}</Link>;
  }

  return item;
};

const allItems: MenuItem[] = [
  buildMenuItem({
    key: "1",
    label: "Phòng",
    link: "/rooms",
    icon: <HomeOutlined />,
  }),
  buildMenuItem({
    key: "2",
    label: "Khách hàng",
    link: "/customer",
    icon: <TeamOutlined />,
  }),
  buildMenuItem({
    key: "3",
    label: "Nhân viên",
    link: "/employee",
    icon: <UserOutlined />,
  }),
  buildMenuItem({
    key: "4",
    label: "Danh mục",
    link: "/categories",
    icon: <AppstoreOutlined />,
  }),
  buildMenuItem({
    key: "5",
    label: "Hóa đơn",
    link: "/order",
    icon: <FileTextOutlined />,
  }),
  buildMenuItem({
    key: "6",
    label: "Profile",
    link: "/profile",
    icon: <IdcardOutlined />,
  }),
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <div>
      <Layout hasSider>
        <Sider
          breakpoint="md"
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
          }}
          width={275}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Row justify={"center"}>
            {collapsed ? (
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="Booking"
                style={{
                  width: 50,
                  height: 50,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            ) : (
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                alt="Booking"
                style={{
                  width: 200,
                  height: 80,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            )}
          </Row>
          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={allItems}
          />
        </Sider>
        <Layout
          className="site-layout"
          style={{
            marginLeft: collapsed ? 80 : 275,
            transition: "margin-left 0.2s",
            height: "100vh",
          }}
        >
          <Header />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
            }}
          >
            <Content
              style={{
                padding: 12,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Outlet />
              </div>
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
};

export default MainLayout;
