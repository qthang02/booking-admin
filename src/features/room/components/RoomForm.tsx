import { Button, Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';

import { Categories } from '../../../model/categories';
import { Rooms } from '../../../model/rooms';

interface RoomFormProps {
  room?: Rooms;
  categories: Categories[];
  onSubmit: (values: Rooms) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ room, categories, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (room) {
      form.setFieldsValue(room);
    } else {
      form.resetFields();
      form.setFieldsValue({ status: 1 }); // Mặc định status là 1 (active) khi thêm phòng
    }
  }, [room, form]);

  const handleFinish = (values: Rooms) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item
        name="roomNumber"
        label="Số phòng"
        rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="categoryId"
        label="Loại phòng"
        rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
      >
        <Select>
          {categories.map((category) => (
            <Select.Option key={category.ID} value={category.ID}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      {room && (
        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select>
            <Select.Option value={1}>Active</Select.Option>
            <Select.Option value={0}>Inactive</Select.Option>
          </Select>
        </Form.Item>
      )}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{
            backgroundColor: '#663366',
            borderColor: '#663366',
            color: '#fff',
          }}
        >
          Lưu
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoomForm;
