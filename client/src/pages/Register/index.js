import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { SetLoader } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await RegisterUser(values);
      navigate("/login");
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="h-screen flex justify-center items-center bg-primary ">
      <div className="bg-white p-5 rounded  sm:w-[450px] w-[350px] ">
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
