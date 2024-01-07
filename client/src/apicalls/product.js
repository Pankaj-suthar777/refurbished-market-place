import { axiosInstance } from "./axiosInstance";

//add a new product
export const AddProduct = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/products//add-new-product",
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
      "/api/products/get-products",
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
      `/api/products/edit-product/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
// get a product by id
export async function GetProductById(id) {
  try {
    const response = await axiosInstance.get(
      `/api/products/get-product-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

// delete a product
export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/products/delete-product/${id}`
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
      `/api/products/upload-image-to-product`,
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
      `/api/products/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//place a new bid
export async function PlaceNewBid(payload) {
  try {
    const response = await axiosInstance.post(
      "/api/bids/place-new-bid",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

//get all bids
export async function GetAllBids(filters) {
  try {
    const response = await axiosInstance.post(
      "/api/bids/get-all-bids",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

//get products by search
export const GetProductsBySearch = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/products/search", payload);
    console.log(response);
    return response.data;
  } catch (error) {
    return error.messgae;
  }
};
