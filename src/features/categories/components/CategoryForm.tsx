import { Button, Form, Input, InputNumber } from 'antd';
import React, { useEffect } from 'react';

import { Categories } from '../../../model/categories';

interface CategoryFormProps {
  category?: Categories;
  onSubmit: (values: Categories) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
  }, [category, form]);

  const handleFinish = (values: Categories) => {
    onSubmit(values);
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item name="name" label="Tên danh mục" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Giá" rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item name="image_link" label="Hình ảnh" rules={[{ required: true, message: 'Vui lòng nhập liên kết hình ảnh!' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {category ? 'Cập nhật' : 'Tạo'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CategoryForm;
