import { Modal, message } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteNotification } from "../apicalls/Notifications";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function deleteNotification(id) {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
        dispatch(SetLoader(false));
      } else {
        dispatch(SetLoader(false));
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }

  return (
    <Modal
      title="Notifications"
      onCancel={() => setShowNotifications(false)}
      footer={null}
      open={showNotifications}
      centerd
    >
      <div className="flex flex-col gap-2 p-1">
        {notifications.map((notification) => (
          <div
            className="flex flex-col rounded-lg border-gray-300 border border-solid p-3 cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between ">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="text-gray-700">{notification.title}</h1>
                <Divider></Divider>
                <span className="text-gray-600">{notification.message}</span>
                <h1 className="text-gray-500 text-sm mt-1">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <i
                className="ri-delete-bin-line  cursor-pointer"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
