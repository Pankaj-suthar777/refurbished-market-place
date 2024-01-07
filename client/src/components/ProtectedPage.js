import { Avatar, Badge, message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import { SetUser } from "../redux/usersSlice";
import Notifications from "./Notifications";
import {
  GetAllNotification,
  ReadAllNotification,
} from "../apicalls/Notifications";

const ProtectedPage = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetCurrentUser();
      dispatch(SetLoader(false));
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  async function getNotification() {
    try {
      const response = await GetAllNotification();

      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  async function readNotifications() {
    try {
      const response = await ReadAllNotification();

      if (response.success) {
        getNotification();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
      getNotification();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <div>
        {/*header*/}
        <div className="flex justify-between items-center bg-primary p-5">
          <h1
            className="text-2xl cursor-pointer text-white"
            onClick={() => navigate("/")}
          >
            RMP
          </h1>
          <div>
            <div className="bg-white py-2 px-5 rounded flex gap-2 items-center">
              <span
                className="underline cursor-pointer uppercase"
                onClick={() => {
                  if (user.role === "user") {
                    navigate("/profile");
                  } else {
                    navigate("/admin");
                  }
                }}
              >
                {user.name}
              </span>
              <Badge
                count={
                  notifications?.filter((notification) => !notification.read)
                    .length
                }
                onClick={() => {
                  readNotifications();
                  setShowNotifications(true);
                }}
                className="cursor-pointer"
              >
                <Avatar
                  shape="circle"
                  icon={<i class="ri-notification-line"></i>}
                />
              </Badge>
              <i
                className="ri-logout-box-r-line ml-10 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>
        </div>

        {/*body*/}
        <div className="p-5">{children}</div>
        <Notifications
          showNotifications={showNotifications}
          notifications={notifications}
          setShowNotifications={setShowNotifications}
          reloadNotifications={getNotification}
        ></Notifications>
      </div>
    )
  );
};

export default ProtectedPage;
