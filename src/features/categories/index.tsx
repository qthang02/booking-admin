import { Button, Col, Row, Space, Table, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import React from "react";

const { Title } = Typography;

export interface Categories {
  name: string;
  description: string;
  image_link: string;
  price: number;
  available_rooms: number;
  type: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}

const sampleCategories: Categories[] = [
  {
    name: "Deluxe Room",
    description: "A luxurious room with a beautiful view.",
    image_link:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/252155037.jpg?k=1c5b6cc7d16c613ba1db96c0f9bb1a5f1b4bf4ea0fff5bccbf632f628aa8a2db&o=&hp=1",
    price: 200,
    available_rooms: 5,
    type: "Deluxe",
    updated_at: "2024-07-09",
    created_at: "2024-01-01",
    deleted_at: null,
  },
  {
    name: "Standard Room",
    description: "A standard room with essential amenities.",
    image_link:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/252155037.jpg?k=1c5b6cc7d16c613ba1db96c0f9bb1a5f1b4bf4ea0fff5bccbf632f628aa8a2db&o=&hp=1",
    price: 100,
    available_rooms: 10,
    type: "Standard",
    updated_at: "2024-07-09",
    created_at: "2024-02-15",
    deleted_at: null,
  },
  {
    name: "Suite",
    description: "A spacious suite with premium facilities.",
    image_link:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/252155037.jpg?k=1c5b6cc7d16c613ba1db96c0f9bb1a5f1b4bf4ea0fff5bccbf632f628aa8a2db&o=&hp=1",
    price: 300,
    available_rooms: 2,
    type: "Suite",
    updated_at: "2024-07-09",
    created_at: "2024-03-20",
    deleted_at: null,
  },
  // Thêm dữ liệu mẫu khác nếu cần
];

export const Categories: React.FC = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image_link",
      key: "image_link",
      render: (text: string) => (
        <img src={text} alt="Category" style={{ width: 100, height: 100 }} />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Available Rooms",
      dataIndex: "available_rooms",
      key: "available_rooms",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Deleted At",
      dataIndex: "deleted_at",
      key: "deleted_at",
      render: (text: string | null) => (text ? text : "N/A"),
    },
    {
      title: "Actions",
      key: "actions",
      render: () => (
        <Space size="middle">
          <Button type="primary" icon={<EditOutlined />}>
            Sửa
          </Button>
          <Button type="primary" danger icon={<DeleteOutlined />}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={2}>Quản lí danh mục</Title>
        </Col>
        <Col>
          <Button type="primary" icon={<PlusOutlined />}>
            Thêm
          </Button>
        </Col>
      </Row>
      <Table columns={columns} dataSource={sampleCategories} rowKey="name" />
    </div>
  );
};
