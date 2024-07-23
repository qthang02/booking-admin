import { Button, Drawer, Form, Input, Modal, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDeleteEmployeeById, useGetOneEmployeeById, useGetallEmployee, useUpdateEmployeeById } from "../../../query/employee";

import { users } from "../../../model/user";

const CustomerList: React.FC = () => {
  const [form] = Form.useForm();
  const { data, isLoading, error } = useGetallEmployee();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Use mutation to fetch user data
  const { mutate: fetchUser, data: userData, isLoading: userLoading, error: userError } = useGetOneEmployeeById();
  const { mutate: updateUser } = useUpdateEmployeeById();
  const { mutate: deleteUser } = useDeleteEmployeeById();

  useEffect(() => {
    if (currentUserId !== null) {
      fetchUser(currentUserId); // Fetch user data when currentUserId is set
    }
  }, [currentUserId, fetchUser]);

  useEffect(() => {
    if (userData) {
      form.setFieldsValue(userData);
    }
  }, [userData, form]);

  useEffect(() => {
    if (!isUpdating) {
      form.resetFields(); // Reset form fields after updating
      setDrawerVisible(false);
      setCurrentUserId(null); // Clear currentUserId after update
    }
  }, [isUpdating, form]);

  const handleEdit = (userId: number) => {
    setCurrentUserId(userId);
    setDrawerVisible(true);
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: 'Xóa người dùng',
      content: 'Bạn có chắc chắn muốn xóa người dùng này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      onOk: () => {
        deleteUser(userId); // Call deleteUser mutation if confirmed
      },
    });
  };

  const handleSave = (values: any) => {
    if (currentUserId) {
      setIsUpdating(true);
      updateUser({ userId: currentUserId, userData: values })
        .finally(() => {
          setIsUpdating(false);
        });
    }
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
      title: 'ID',
      key: 'id',
      render: (_: any, __: any, index: number) => index + 1, // Cột ID tự động cộng dồn
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: users) => (
        <div style={{ display: 'flex', gap: '10px' }}>
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
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
      />

      <Drawer
        title="Thông Tin Người Dùng"
        placement="right"
        closable={false}
        onClose={() => setDrawerVisible(false)}
        visible={drawerVisible}
        width={400}
      >
        {userLoading ? (
          <Spin size="large" />
        ) : userError ? (
          <div>Error: {userError.message}</div>
        ) : (
          userData && (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSave} // Call handleSave when form is submitted
            >
              <Form.Item
                name="username"
                label="Tên người dùng"
                rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Lưu
                </Button>
                <Button
                  style={{ margin: '0 10px' }}
                  onClick={() => setDrawerVisible(false)}
                >
                  Hủy
                </Button>
              </Form.Item>
            </Form>
          )
        )}
      </Drawer>
    </div>
  );
};

export default CustomerList;
