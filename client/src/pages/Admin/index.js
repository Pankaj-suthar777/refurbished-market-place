import { Tabs } from "antd";
import React, { useEffect } from "react";
import Products from "./Products";
import Users from "./Users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products></Products>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users></Users>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
