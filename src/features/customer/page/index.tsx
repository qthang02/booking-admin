// customerPage.tsx

import { Button, Drawer, Modal, Pagination, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDeleteCustomer, useListCustomers } from "../../../query/customer";

import { ColumnsType } from "antd/es/table";
import { EventClick } from "../../../utils/type";
import { User } from "../../../model/user";
import { UserForm } from "../components/userForm";

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
  handleEdit: (user: User) => void;
  handleDelete: (id: number) => void;
};

const newUserTable = (props: TableProps): ColumnsType<User> => [
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
    render: (_text, record) => (
      <div style={{ display: "flex", gap: "10px" }}>
        <Button
          type="primary"
          icon={<EditOutlined />}
          onClick={() => props.handleEdit(record)}
          style={iconButtonStyle(false)}
        />
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => props.handleDelete(record.id)}
          style={iconButtonStyle(false)}
        />
      </div>
    ),
  },
];

const CustomerPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [event, setEvent] = useState<EventClick>("EVT_UPDATE");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const listCustomersQuery = useListCustomers(currentPage, pageSize);
  const deleteCustomerMutation = useDeleteCustomer();

  const handleEdit = (user: User) => {
    setEvent("EVT_UPDATE");
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Xác nhận xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa người dùng này?",
      onOk: () => {
        deleteCustomerMutation.mutate(id);
      },
    });
  };

  const handleCreate = () => {
    setEvent("EVT_CREATE");
    setSelectedUser(undefined);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
  };

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleCreate}
          style={iconButtonStyle(false)}
        >
          Tạo người dùng
        </Button>
      </div>
      <Table
        columns={newUserTable({ handleEdit, handleDelete })}
        dataSource={listCustomersQuery.data?.data}
        rowKey="id"
        loading={listCustomersQuery.isLoading}
        pagination={false} // Disable default pagination
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={listCustomersQuery.data?.paging|| 0}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={[10, 20, 30,50]}
      />
      <Drawer
        title={event === "EVT_CREATE" ? "Tạo người dùng" : "Chỉnh sửa thông tin người dùng"}
        placement="right"
        closable
        onClose={handleDrawerClose}
        open={drawerOpen}
        width={400}
      >
        <UserForm user={selectedUser} event={event} />
      </Drawer>
    </>
  );
};

export default CustomerPage;
