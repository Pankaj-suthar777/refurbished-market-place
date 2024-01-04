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
export const GetProducts = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/get-products",
      payload
    );
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

// upload a image
export const UploadProductImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      `/api/users/upload-image-to-product`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// update product status
export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
