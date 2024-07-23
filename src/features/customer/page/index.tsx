import { Button, Drawer, Form, Input, Modal, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  useCreateNewUser,
  useDeleteUserById,
  useGetOneUserById,
  useGetallUser,
  useUpdateUserById,
} from "../../../query/customer";

import { users } from "../../../model/user";

const CustomerList: React.FC = () => {
  const [form] = Form.useForm();
  const { data, isLoading, error } = useGetallUser();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { mutate: createUser } = useCreateNewUser();

  const {
    mutate: fetchUser,
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetOneUserById();
  const { mutate: updateUser } = useUpdateUserById();
  const { mutate: deleteUser } = useDeleteUserById();

  useEffect(() => {
    if (currentUserId !== null) {
      fetchUser(currentUserId);
    }
  }, [currentUserId, fetchUser]);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData);
    }
  }, [userData, form]);

  const handleEdit = (userId: number) => {
    setCurrentUserId(userId);
    setDrawerOpen(true);
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: "Xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa người dùng này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        deleteUser(userId);
      },
    });
  };

  const handleSave = (values: any) => {
    console.log("Sending data:", values);

    if (currentUserId) {
      setIsUpdating(true);
      updateUser({ userId: currentUserId, userData: values }).finally(() => {
        setIsUpdating(false);
        form.resetFields();
        setDrawerOpen(false);
        setCurrentUserId(null);
      });
    } else {
      createUser(values).finally(() => {
        setIsUpdating(false);
        form.resetFields();
        setDrawerOpen(false);
        setCurrentUserId(null);
      });
    }
  };

  const handleAddNew = () => {
    setCurrentUserId(null);
    setDrawerOpen(true);
  };

  const iconButtonStyle = (isHovered: boolean) => ({
    backgroundColor: isHovered ? "#4a2a59" : "#663366",
    borderColor: isHovered ? "#4a2a59" : "#663366",
    color: "#fff",
    transition: "all 0.3s ease",
    margin: "0 5px",
    borderRadius: "5px",
    border: "none",
    padding: "5px 10px",
  });

  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Tên người dùng",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: users) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record.ID)}
            style={iconButtonStyle(false)}
          />
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.ID)}
            style={iconButtonStyle(false)}
          />
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "20px" }}
      >
        Error: {error.message}
      </div>
    );
  }

  // Log the data to check its structure
  console.log("Fetched data:", data);

  return (
    <div style={{ padding: "20px" }}>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddNew}
        style={{ marginBottom: "20px" }}
      >
        Thêm mới
      </Button>

      <Table
        columns={columns}
        dataSource={Array.isArray(data) ? data : []}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Drawer
        title={currentUserId ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
        placement="right"
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={400}
      >
        {userLoading ? (
          <Spin size="large" />
        ) : userError ? (
          <div>Error: {userError.message}</div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
          >
            <Form.Item
              name="username"
              label="Tên người dùng"
              rules={[
                { required: true, message: "Vui lòng nhập tên người dùng!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Số điện thoại"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="address"
              label="Địa chỉ"
              rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button
                style={{ margin: "0 10px" }}
                onClick={() => setDrawerOpen(false)}
              >
                Hủy
              </Button>
            </Form.Item>
          </Form>
        )}
      </Drawer>
    </div>
  );
};

export default CustomerList;




