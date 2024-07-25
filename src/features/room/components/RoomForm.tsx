import { Button, Form, InputNumber, Select } from 'antd';
import React, { useEffect } from 'react';

import { Categories } from '../../../model/categories';
import { Rooms } from '../../../model/rooms';
import { useListCategories } from '../../../query/categories';

interface RoomFormProps {
  room?: Rooms;
  onSubmit: (values: Rooms) => void;
}

const RoomForm: React.FC<RoomFormProps> = ({ room, onSubmit }) => {
  const [form] = Form.useForm();
  const { data: categories, isLoading } = useListCategories();

  useEffect(() => {
    if (room) {
      form.setFieldsValue(room);
    } else {
      form.resetFields();
    }
  }, [room, form]);

  const handleFinish = (values: Rooms) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="roomNumber" label="Số phòng" rules={[{ required: true, message: 'Vui lòng nhập số phòng!' }]}>
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item name="categoryId" label="Loại phòng" rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}>
        <Select loading={isLoading}>
          {categories?.categories.map((category: Categories) => (
            <Select.Option key={category.ID} value={category.ID}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái phòng!' }]}>
        <Select>
          <Select.Option value={1}>Active</Select.Option>
          <Select.Option value={0}>Inactive</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {room ? 'Cập nhật' : 'Tạo'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RoomForm;
