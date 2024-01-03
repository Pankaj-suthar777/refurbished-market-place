import { axiosInstance } from "./axiosInstance";

//add a new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users//add-new-product",
      payload
    );
    return response.data;
  } catch (error) {
    return error.messgae;
  }
};

//get all products
export const GetProducts = async () => {
  try {
    const response = await axiosInstance.get("/api/users/get-products");
    return response.data;
  } catch (error) {
    return error.messgae;
  }
};

// edit a product
export const EditProduct = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// delete a product
export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/users/delete-product/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
