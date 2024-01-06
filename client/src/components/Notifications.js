import { Modal } from "antd";
import React from "react";
import Divider from "./Divider";
import { useNavigate } from "react-router-dom";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
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
            onClick={() => {
              navigate(notification.onClick);
              setShowNotifications(false);
            }}
          >
            <h1 className="text-gray-700">{notification.title}</h1>
            <Divider></Divider>
            <span className="text-gray-500">{notification.message}</span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
