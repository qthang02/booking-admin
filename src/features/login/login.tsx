import { Button, Form, Input, Space } from "antd";

import { LoginRequest } from "../../model/authen";
import React from "react";
import { useLogin } from "../../query/authen";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const loginMutation = useLogin();

  const onFinish = (values: LoginRequest) => {
    loginMutation.mutate(values);
  };
  return (
    <div className="flex flex-col min-h-screen">
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#663366",
          fontWeight: "bold",
          fontSize: "xx-large",
          marginTop: "20px",
        }}
      >
        Đăng Nhập
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Space direction="vertical" size="large">
          <Form
            name="login"
            form={form}
            onFinish={onFinish}
            style={{ width: 500, padding: "20px", borderRadius: "5px" }}
          >
            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                { type: "email", message: "The input is not valid E-mail!" },
                { required: true, message: "Please input your E-mail!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ backgroundColor: "#663366", borderColor: "#663366" }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </div>
    </div>
  );
};

export default Login;
