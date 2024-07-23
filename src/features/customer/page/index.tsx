import {Button, Drawer, Modal, Table} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import React, {useState} from "react";
import {
  useDeleteCustomer,
  useListCustomers,
} from "../../../query/customer";

import { User } from "../../../model/user";
import {ColumnsType} from "antd/es/table";
import Empty from "antd/es/empty/empty";
import {UserForm} from "../components/userForm.tsx";
import {EventClick} from "../../../utils/type.ts";


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
}

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
            <div style={{display: "flex", gap: "10px"}}>
              <Button
                  type="primary"
                  icon={<EditOutlined/>}
                  onClick={() => props.handleEdit(_record)}
                  style={iconButtonStyle(false)}
              />
              <Button
                  danger
                  icon={<DeleteOutlined/>}
                  onClick={() => props.handleDelete(_record.id)}
                  style={iconButtonStyle(false)}
              />
            </div>
        )
      },
    },
  ]
}

const CustomerPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [titleDrawer, setTitleDrawer] = useState("");
  const [user, setUser] = useState<User | undefined>(undefined);
  const listUsers = useListCustomers();
  const deleteUser = useDeleteCustomer();
  const [eventClick, setEventClick] = useState<EventClick>("EVT_NONE");

  const handleEdit = (user: User) => {
    setEventClick("EVT_UPDATE");
    setUser(user);
    setDrawerOpen(true);
    setTitleDrawer("Cập nhật người khách hàng");
  };

  const handleDelete = (userId: number) => {
    Modal.confirm({
      title: "Xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa người dùng này?",
      okText: "Xóa",
      cancelText: "Hủy",
      onOk: () => {
        deleteUser.mutate(userId);
      },
    });
  };

  const handleAddNew = () => {
    setUser(undefined);
    setEventClick("EVT_CREATE");
    setDrawerOpen(true);
    setTitleDrawer("Thêm người khách hàng");
  };

  return (
    <div style={{ padding: "20px" }}>
     <div>
       <Button
           type="primary"
           icon={<PlusOutlined />}
           onClick={handleAddNew}
           style={{ marginBottom: "20px" }}
       >
         Thêm mới
       </Button>
     </div>

      {listUsers?.data?.data && Array.isArray(listUsers.data.data) ? (
          <Table
              columns={newUserTable({
                handleDelete,
                handleEdit,
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
        title={titleDrawer}
        placement="right"
        closable={false}
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={400}
      >
        <UserForm user={user} event={eventClick} />
      </Drawer>
    </div>
  );
};

export default CustomerPage;




