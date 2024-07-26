import { Button, Form, Input } from "antd";
import { useCreateCustomer, useUpdateCustomer } from "../../../query/customer";

import { EventClick } from "../../../utils/type";
import { User } from "../../../model/user";
import { useEffect } from "react";

export const UserForm = (props: { user: User | undefined, event: EventClick }) => {
  const [form] = Form.useForm();
  const updateCustomerMutation = useUpdateCustomer();
  const createCustomerMutation = useCreateCustomer();

  const onFinish = (value: User) => {
    if (props.event === "EVT_UPDATE") {
      updateCustomerMutation.mutate({
        id: props.user!.id,
        user: value
      });
    }

    if (props.event === "EVT_CREATE") {
      createCustomerMutation.mutate({ user: value });
    }
  };

  useEffect(() => {
    if (props.event === "EVT_CREATE") {
      form.resetFields();
    } else if (props.user) {
      form.setFieldsValue(props.user);
    }
  }, [props.user, props.event, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
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
      {props.event === "EVT_CREATE" && (
        <Form.Item
          name="password"
          label="password"
          rules={[{ required: true, message: "Vui lòng nhập password!" }]}
        >
          <Input type={"password"} />
        </Form.Item>
      )}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {props.event === "EVT_UPDATE" ? "Cập nhật" : "Tạo mới"}
        </Button>
      </Form.Item>
    </Form>
  );
};