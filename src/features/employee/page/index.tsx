import { Button, Drawer, Modal, Pagination, Table } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDeleteEmployee, useListEmployees } from "../../../query/employee";

import { ColumnsType } from "antd/es/table";
import { EmployeeForm } from "../components/employeeForm";
import { EventClick } from "../../../utils/type";
import { User } from "../../../model/user";

// import Empty from "antd/es/empty/empty";




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

const newUserTable = (props: TableProps): ColumnsType<User> => {
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
      render: (_text, _record) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => props.handleEdit(_record)}
              style={iconButtonStyle(false)}
            />
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => props.handleDelete(_record.id)}
              style={iconButtonStyle(false)}
            />
          </div>
        );
      },
    },
  ];
};

export const EmployeePage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [event, setEvent] = useState<EventClick>("EVT_UPDATE");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const listEmployeesQuery = useListEmployees(currentPage, pageSize);
  const deleteEmployeeMutation = useDeleteEmployee();

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
        deleteEmployeeMutation.mutate(id);
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
        dataSource={listEmployeesQuery.data?.data}
        rowKey="id"
        loading={listEmployeesQuery.isLoading}
        // locale={{
        //   emptyText: <Empty description="Không có người dùng" />,
        // }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={listEmployeesQuery.data?.paging|| 0}
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
        <EmployeeForm user={selectedUser} event={event} />
      </Drawer>
    </>
  );
};
