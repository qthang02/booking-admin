import { Button, Drawer, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useCreateOrder, useDeleteOrder, useListOrders, useUpdateOrder } from '../../../query/order';

import { Order } from '../../../model/orders';
import OrderForm from '../components/OrderForm';
import { User } from '../../../model/user';
import { useListCustomers } from '../../../query/customer';
import { useListRooms } from '../../../query/rooms';

const OrderPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | undefined>(undefined);
  
  // Pagination configuration
  const page = 1; // Assuming a default page number
  const limit = 10; // Assuming a default limit for pagination

  // Fetch orders
  const { data: orderData, refetch: refetchOrders } = useListOrders();
  const orders = orderData?.Orders; // Access Orders array from the response
  
  // Fetch rooms
  const { data: rooms } = useListRooms();
  
  // Fetch customers
  const { data: customers } = useListCustomers(page, limit);

  const createOrder = useCreateOrder();
  const updateOrder = useUpdateOrder();
  const deleteOrder = useDeleteOrder();

  const handleAddOrder = () => {
    setSelectedOrder(undefined);
    setDrawerOpen(true);
  };

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const handleDeleteOrder = (id: number) => {
    deleteOrder.mutate(id, {
      onSuccess: () => {
        notification.success({ message: 'Xóa đơn hàng thành công!' });
        refetchOrders();
      },
      onError: (error: unknown) => notification.error({ message: 'Xóa đơn hàng thất bại', description: (error as Error).message }),
    });
  };

  const handleOrderSubmit = (order: Order) => {
    if (order.ID === 0) {
      createOrder.mutate({ orders: order }, {
        onSuccess: () => {
          notification.success({ message: 'Thêm đơn hàng thành công!' });
          refetchOrders();
          setDrawerOpen(false);
        },
        onError: (error: unknown) => notification.error({ message: 'Thêm đơn hàng thất bại', description: (error as Error).message }),
      });
    } else {
      updateOrder.mutate({ id: order.ID, orders: order }, {
        onSuccess: () => {
          notification.success({ message: 'Cập nhật đơn hàng thành công!' });
          refetchOrders();
          setDrawerOpen(false);
        },
        onError: (error: unknown) => notification.error({ message: 'Cập nhật đơn hàng thất bại', description: (error as Error).message }),
      });
    }
  };

  const columns = [
    {
      title: 'Số khách',
      dataIndex: 'guestNumber',
      key: 'guestNumber',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Ngày nhận phòng',
      dataIndex: 'checkin',
      key: 'checkin',
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Ngày trả phòng',
      dataIndex: 'checkout',
      key: 'checkout',
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Loại phòng',
      dataIndex: 'categoryType',
      key: 'categoryType',
    },
    {
      title: 'Số phòng',
      dataIndex: 'roomNumber',
      key: 'roomNumber',
    },
    {
      title: 'Người dùng',
      dataIndex: 'userID',
      key: 'userID',
      render: (userID: number) => {
        const customer = customers?.data.find((customer: User) => customer.id === userID);
        return customer ? customer.username : 'Không xác định';
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text: string, record: Order) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditOrder(record)}
            style={{ marginRight: '8px' }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteOrder(record.ID)}
          />
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddOrder}
        style={{
          marginBottom: '16px',
          backgroundColor: '#663366',
          borderColor: '#663366',
          color: '#fff',
        }}
      >
        Thêm Đơn Hàng
      </Button>
      <Table dataSource={orders} columns={columns} rowKey="ID" />
      <Drawer
        title={selectedOrder ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'}
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={720}
      >
        <OrderForm
          order={selectedOrder}
          rooms={rooms || []}
          users={customers?.data || []}  // Thay đổi từ users sang customers
          onSubmit={handleOrderSubmit}
        />
      </Drawer>
    </div>
  );
};

export default OrderPage;
