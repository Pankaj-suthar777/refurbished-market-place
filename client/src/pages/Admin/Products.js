import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { SetLoader } from "../../redux/loadersSlice";
import { GetProducts, UpdateProductStatus } from "../../apicalls/product";

function Products() {
  const [products, setProduct] = useState();
  const dispatch = useDispatch();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(null);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  async function onStatusUpdate(id, status) {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
        getData();
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="flex flex-col mt-2 gap-2">
        {products &&
          products.map((item) => {
            return (
              <div className="grid md:grid-cols-[200px_1fr_150px] border border-solid p-2 rounded-[10px]">
                <div className="break-all break-words">
                  <b>Product : </b>
                  {item.name}
                  <p>
                    <b>Seller : </b>
                    {item.seller.name}
                  </p>
                  <p>
                    <b>Description : </b>
                    {item.description}
                  </p>
                  <p>
                    <b>Age : </b>
                    {item.age}
                  </p>
                  <p>
                    <b>Price : </b>
                    {item.price}rs
                  </p>

                  <p>
                    <b>Category : </b>
                    {item.category}
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>
                    <b>Stataus : </b>
                    {item.status}
                  </p>
                  <p>
                    <b>Created At : </b>
                    {moment(item.createdAt).format("DD-MM-YY hh:mm A")}
                  </p>
                </div>

                <div className="flex gap-5 items-center">
                  {item.status === "pending" && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        onStatusUpdate(item._id, "approved");
                      }}
                    >
                      Approve
                    </span>
                  )}
                  {item.status === "pending" && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        onStatusUpdate(item._id, "rejected");
                      }}
                    >
                      Reject
                    </span>
                  )}
                  {item.status === "approved" && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        onStatusUpdate(item._id, "blocked");
                      }}
                    >
                      Block
                    </span>
                  )}
                  {item.status === "blocked" && (
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        onStatusUpdate(item._id, "approved");
                      }}
                    >
                      Unblock
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Products;
