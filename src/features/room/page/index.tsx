import { Button, Drawer, Modal, Pagination, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useCreateRoom, useDeleteRoom, useListRooms, useUpdateRoom } from '../../../query/rooms';

import RoomForm from '../components/RoomForm';
import { Rooms } from '../../../model/rooms';
import { useListCategories } from '../../../query/categories';

const RoomPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedRoom, setSelectedRoom] = useState<Rooms | undefined>(undefined);
  const [event, setEvent] = useState<'create' | 'update' | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const { data: roomsData, isLoading } = useListRooms();
  const { data: categoriesData } = useListCategories();

  const createRoomMutation = useCreateRoom();
  const updateRoomMutation = useUpdateRoom();
  const deleteRoomMutation = useDeleteRoom();

  const handleEdit = (room: Rooms) => {
    setEvent('update');
    setSelectedRoom(room);
    setDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa phòng',
      content: 'Bạn có chắc chắn muốn xóa phòng này?',
      onOk: () => {
        deleteRoomMutation.mutate(id);
      },
    });
  };

  const handleCreate = () => {
    setEvent('create');
    setSelectedRoom(undefined);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleFormSubmit = (values: Rooms) => {
    if (event === 'update' && selectedRoom) {
      updateRoomMutation.mutate({ id: selectedRoom.ID, room: values });
    } else {
      createRoomMutation.mutate({
        roomNumber: values.roomNumber,
        categoryId: values.categoryId,
      });
    }
    setDrawerOpen(false);
  };

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page);
    if (size) {
      setPageSize(size);
    }
  };

  const columns = [
    {
      title: 'STT',
      key: 'index',
      render: (_text: string, _record: Rooms, index: number) => index + 1,
    },
    {
      title: 'Số phòng',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Loại phòng',
      key: 'category',
      render: (_text: string, record: Rooms) => {
        const category = categoriesData?.categories?.find((cat) => cat.ID === record.categoryId);
        return category ? category.name : 'Chưa xác định';
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (status === 1 ? 'Ready' : 'Occupied'),
    },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_text: string, record: Rooms) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{
              marginRight: '8px',
              backgroundColor: '#663366',
              borderColor: '#663366',
              color: '#fff',
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.ID)}
            danger
            style={{
              backgroundColor: '#663366',
              borderColor: '#663366',
              color: '#fff',
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        style={{
          marginBottom: '16px',
          backgroundColor: '#663366',
          borderColor: '#663366',
          color: '#fff',
        }}
      >
        Thêm phòng
      </Button>

      <Table
        columns={columns}
        dataSource={roomsData?.rooms || []}
        rowKey="ID"
        loading={isLoading}
        pagination={false}
      />

      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={roomsData?.paging || 0}
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={[10, 20, 30, 50]}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />

      <Drawer
        title={event === 'update' ? 'Cập nhật phòng' : 'Tạo phòng'}
        visible={drawerOpen}
        onClose={handleDrawerClose}
        width={720}
      >
        <RoomForm room={selectedRoom} categories={categoriesData?.categories || []} onSubmit={handleFormSubmit} />
      </Drawer>
    </div>
  );
};

export default RoomPage;
