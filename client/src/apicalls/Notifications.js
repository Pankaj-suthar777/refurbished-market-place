import { axiosInstance } from "./axiosInstance";

// add a notification
export const AddNotification = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/notifications/notify",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all notifications by user
export const GetAllNotification = async (data) => {
  try {
    const response = await axiosInstance.post(
      "/api/notifications/get-all-notifications",
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete a notification
export const DeleteNotification = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/notifications/delete-a-notification/${id}`
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// read all notification by user
export const ReadAllNotification = async () => {
  try {
    const response = await axiosInstance.put(
      "/api/notifications/read-all-notifications"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
