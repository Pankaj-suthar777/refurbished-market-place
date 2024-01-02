import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);

      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-primary">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary">
          SMP -<span className="text-gray-400"> REGISTER</span>
        </h1>
        <Divider></Divider>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name"></Input>
          </Form.Item>
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
              Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
