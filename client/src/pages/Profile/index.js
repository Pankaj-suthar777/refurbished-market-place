import { Tabs } from "antd";
import React from "react";
import Products from "./Products";
import UsersBids from "./UsersBids";
import { useSelector } from "react-redux";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Bids" key="2">
          <UsersBids></UsersBids>
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col lg:w-1/3">
            <span className="text-xl flex justify-between">
              Name: <span className="text-xl">{user.name}</span>
            </span>
            <span className="text-xl flex justify-between">
              Email: <span className="text-xl">{user.email}</span>
            </span>
            <span className="text-xl flex justify-between">
              CreatedAt:
              <span className="text-xl">
                {moment(user.createdAt).format("MMM D , YYYY hh:mm A")}
              </span>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
