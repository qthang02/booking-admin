import { Card, Col, Form, Input, Row, Spin } from "antd";
import React, { useEffect } from "react";

import { useGetProfile } from "../../../query/authen";

export const Profile: React.FC = () => {
  const [form] = Form.useForm();
  const { data: profile, isLoading } = useGetProfile();

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        username: profile.username,
        phone: profile.phone,
        address: profile.address,
        email: profile.email,
        role: profile.role,
      });
    }
  }, [profile, form]);

  if (isLoading) {
    return (
      <Row justify="center" style={{ marginTop: "50px" }}>
        <Spin size="large" />
      </Row>
    );
  }

  return (
    <Row justify="center" style={{ marginTop: "50px" }}>
      <Col span={12}>
        <Card title="Profile" bordered={false}>
          <Form form={form} layout="vertical">
            <Form.Item label="Username" name="username">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Address" name="address">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input disabled />
            </Form.Item>
            <Form.Item label="Role" name="role">
              <Input disabled />
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
