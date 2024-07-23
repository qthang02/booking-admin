import { Button, Drawer, Form, Input, Modal, Spin, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import {
  useGetOneUserById,
  useListUsers,
} from "../../../query/customer";

import { users } from "../../../model/user";
import {ColumnsType} from "antd/es/table";
import Empty from "antd/es/empty/empty";


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

type TableProps = {
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const newUserTable = (props: TableProps): ColumnsType<users> => {
  return [
    {
      title: "STT",
      key: "id",
      render: (_text, _record, index) => index + 1,
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
      render: (user: users) => (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => props.handleEdit(user.ID)}
                style={iconButtonStyle(false)}
            />
            <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => props.handleDelete(user.ID)}
                style={iconButtonStyle(false)}
            />
          </div>
      ),
    },
  ]
}

const CustomerList: React.FC = () => {
  const [form] = Form.useForm();
  const listUsers = useListUsers();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  // const [isUpdating, setIsUpdating] = useState(false);
  // const { mutate: createUser } = useCreateNewUser();

  const {
    mutate: fetchUser,
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetOneUserById();
  // const { mutate: updateUser } = useUpdateUserById();
  // const { mutate: deleteUser } = useDeleteUserById();

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
        // deleteUser(userId);
      },
    });
  };

  // const handleSave = (values: any) => {
  //   console.log("Sending data:", values);
  //
  //   if (currentUserId) {
  //     setIsUpdating(true);
  //     updateUser({ userId: currentUserId, userData: values }).finally(() => {
  //       setIsUpdating(false);
  //       form.resetFields();
  //       setDrawerOpen(false);
  //       setCurrentUserId(null);
  //     });
  //   } else {
  //     createUser(values).finally(() => {
  //       setIsUpdating(false);
  //       form.resetFields();
  //       setDrawerOpen(false);
  //       setCurrentUserId(null);
  //     });
  //   }
  // };

  const handleAddNew = () => {
    setCurrentUserId(null);
    setDrawerOpen(true);
  };


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

      {listUsers?.data?.data && Array.isArray(listUsers.data.data) ? (
          <Table
              columns={newUserTable({
                handleDelete,
                handleEdit
              })}
              rowKey="id"
              dataSource={listUsers.data.data}
              bordered
              pagination={{ pageSize: 10 }}
          />
      ) : (
          <Empty />
      )}

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
            // onFinish={handleSave}
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




