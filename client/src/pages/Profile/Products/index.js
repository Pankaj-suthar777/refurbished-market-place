import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/product";
import moment from "moment";
import Bids from "./Bids";

function Products() {
  const [showBidsModal, setShowBidsModal] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProduct] = useState();
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  async function deleteProduct(id) {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteProduct(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts({
        seller: user._id,
      });

      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.data);
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
      <div className="flex justify-between">
        <h1 className="text-lg">Your Products</h1>
        <Button
          type="default"
          onClick={() => {
            setShowProductForm(true);
            setSelectedProduct(null);
          }}
        >
          Add Product
        </Button>
      </div>

      <div className="flex flex-col mt-2 gap-2">
        {products &&
          products.map((item) => {
            return (
              <div>
                <div className="flex flex-col md:flex-row border justify-between border-solid p-2 rounded-[10px]">
                  <div className="break-all break-words justify-between">
                    <b>Name : </b>
                    {item.name}
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
                  <div className="flex flex-col items-center justify-center mt-2">
                    <p>
                      <b>Stataus : </b>
                      {item.status}
                    </p>
                    <p>
                      <b>Created At : </b>
                      {moment(item.createdAt).format("DD-MM-YY hh:mm A")}
                    </p>
                  </div>

                  <div className="flex gap-5 items-center ">
                    <i
                      className="ri-delete-bin-line text-2xl cursor-pointer"
                      onClick={() => deleteProduct(item._id)}
                    ></i>
                    <i
                      class="ri-pencil-line text-2xl cursor-pointer"
                      onClick={() => {
                        setSelectedProduct(item);
                        setShowProductForm(true);
                      }}
                    ></i>
                    <span
                      className="underline cursor-pointer"
                      onClick={() => {
                        setShowBidsModal(true);
                        setSelectedProduct(item);
                      }}
                    >
                      Show Bids
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        ></ProductsForm>
      )}

      {showBidsModal && (
        <Bids
          setShowBidsModal={setShowBidsModal}
          showBidsModal={showBidsModal}
          selectedProduct={selectedProduct}
        ></Bids>
      )}
    </div>
  );
}

export default Products;
