import { Button, Card, Col, Form, Input, Row } from "antd";

import { useState } from "react";

export const Profile = () => {
  const [form] = Form.useForm();

  // Các state để lưu trữ thông tin profile
  const [profile, setProfile] = useState({
    username: "admin",
    phone: "0123456789",
    address: "123 Admin Street",
    email: "admin@example.com",
    role: "Admin",
  });

  // Hàm xử lý khi submit form đổi mật khẩu
  const onFinish = (values) => {
    console.log("Đổi mật khẩu:", values);
    // Gọi API để đổi mật khẩu tại đây
  };

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col span={12}>
        <Card title="Profile" bordered={false}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item label="Username">
              <Input value={profile.username} disabled />
            </Form.Item>
            <Form.Item label="Phone">
              <Input value={profile.phone} disabled />
            </Form.Item>
            <Form.Item label="Address">
              <Input value={profile.address} disabled />
            </Form.Item>
            <Form.Item label="Email">
              <Input value={profile.email} disabled />
            </Form.Item>
            <Form.Item label="Role">
              <Input value={profile.role} disabled />
            </Form.Item>
          </Form>
        </Card>
        <Card title="Change Password" bordered={false}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="oldPassword"
              label="Mật khẩu cũ"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu cũ!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              rules={[
                { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Xác nhận mật khẩu mới"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Mật khẩu xác nhận không khớp!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
