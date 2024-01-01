import React from "react";
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Login() {
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-primary">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary">
          SMP -<span className="text-gray-400"> Login</span>
        </h1>
        <Divider></Divider>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email"></Input>
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password"></Input>
          </Form.Item>
          <Button className="mt-2" type="primary" htmlType="submit" block>
            Submit
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Don't have an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
