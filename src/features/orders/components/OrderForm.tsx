import { Button, DatePicker, Form, Input, Select } from 'antd';

import { Categories } from '../../../model/categories';
import { Order } from '../../../model/orders';
import React from 'react';
import { Rooms } from '../../../model/rooms';
import { User } from '../../../model/user';

interface OrderFormProps {
  order?: Order;
  rooms: Rooms[]; // Đảm bảo đây là một mảng
  users: User[]; // Đảm bảo đây là một mảng
  onSubmit: (order: Order) => void;
}

const { Option } = Select;

const OrderForm: React.FC<OrderFormProps> = ({ order, rooms, users, onSubmit }) => {
  const [form] = Form.useForm();

  // Kiểm tra dữ liệu đầu vào
  if (!Array.isArray(rooms)) {
    console.error('Invalid data: rooms should be an array');
    return <div>Invalid data</div>;
  }

  if (!Array.isArray(users)) {
    console.error('Invalid data: users should be an array');
    return <div>Invalid data</div>;
  }

  // Hàm xử lý khi form được submit
  const handleFinish = (values: any) => {
    // Convert form values to Order type
    const updatedOrder: Order = {
      ...values,
      ID: order?.ID || 0, // ID sẽ được gán nếu có
      CreatedAt: order?.CreatedAt || new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
      DeletedAt: null, // Có thể thay đổi tùy thuộc vào logic của bạn
      user: users.find(user => user.id === values.userID) || { id: 0, username: '', phone: 0, address: '', email: '', role: 'customer', updated_at: '', created_at: '', deleted_at: null },
      room: rooms.find(room => room.ID === values.roomNumber) || { ID: 0, roomNumber: 0, status: 1, categoryId: 0, CreatedAt: '', UpdatedAt: '', DeletedAt: null, order: {} as Order, category: {} as Categories }
    };

    onSubmit(updatedOrder);
  };

  return (
    <Form
      form={form}
      onFinish={handleFinish}
      initialValues={order}
      layout="vertical"
    >
      <Form.Item
        name="guestNumber"
        label="Số khách"
        rules={[{ required: true, message: 'Vui lòng nhập số khách!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Giá"
        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        name="description"
        label="Mô tả"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="checkin"
        label="Ngày nhận phòng"
        rules={[{ required: true, message: 'Vui lòng chọn ngày nhận phòng!' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="checkout"
        label="Ngày trả phòng"
        rules={[{ required: true, message: 'Vui lòng chọn ngày trả phòng!' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="categoryType"
        label="Loại phòng"
        rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
      >
        <Select>
          {rooms.map(room => (
            <Option key={room.ID} value={room.ID}>
              {room.category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="roomNumber"
        label="Số phòng"
        rules={[{ required: true, message: 'Vui lòng chọn số phòng!' }]}
      >
        <Select>
          {rooms.map(room => (
            <Option key={room.roomNumber} value={room.roomNumber}>
              {room.roomNumber}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="userID"
        label="Người đặt"
        rules={[{ required: true, message: 'Vui lòng chọn người đặt!' }]}
      >
        <Select>
          {users.map(user => (
            <Option key={user.id} value={user.id}>
              {user.username}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {order ? 'Cập nhật đơn hàng' : 'Tạo đơn hàng'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default OrderForm;
