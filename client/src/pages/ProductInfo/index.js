import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetProductById } from "../../apicalls/product";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function ProductInfo() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState();
  const { id } = useParams();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div className="grid grid-cols-2 gap-5 mt-3">
        {/*image*/}
        <div className="flex flex-col gap-5">
          <img
            className="w-full h-96 object-cover rounded-md"
            src={product.images[selectedImageIndex]}
            alt=""
          ></img>

          <div className="flex gap-5">
            {product.images.map((image, index) => {
              return (
                <img
                  className={
                    "w-20 h-20 object-cover rounded-md cursor-pointer " +
                    (selectedImageIndex === index
                      ? " border-green-700 border-2 border-dashed p-2 "
                      : "")
                  }
                  src={image}
                  alt=""
                  onClick={() => setSelectedImageIndex(index)}
                ></img>
              );
            })}
          </div>
          <Divider></Divider>
          <div>
            <h1 className="text-gray-700">Added on</h1>
            <span className="text-gray-700">
              {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
            </span>
          </div>
        </div>

        {/*details*/}
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl text-orange-900 font-semibold">
            {product.name}
          </h1>
          <span>{product.description}</span>
          <Divider></Divider>
          <div className="flex flex-col">
            <h1 className="text-2xl text-orange-900 font-semibold uppercase">
              Product details
            </h1>
            <div className="flex justify-between mt-2">
              <span>Price</span>
              <span>&#8377; {product.price}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Category</span>
              <span className="uppercase">{product.category}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Bill Available</span>
              <span>{product.billAvailable ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Box Available</span>
              <span>{product.boxAvailable ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Accessories Available</span>
              <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Warranty Available</span>
              <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
            </div>
          </div>
          <Divider></Divider>
          <div className="flex flex-col">
            <h1 className="text-2xl text-orange-900 font-semibold uppercase">
              Seller Details
            </h1>
            <div className="flex justify-between mt-2">
              <span>Name</span>
              <span>{product.seller.name}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Email</span>
              <span>{product.seller.email}</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default ProductInfo;
