import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/product";
import moment from "moment";

function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProduct] = useState();
  const [showProductForm, setShowProductForm] = useState(false);
  const dispatch = useDispatch();

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createAt).format("DD-MM-YY hh:mm A"),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-delete-bin-line"
              onClick={() => deleteProduct(record._id)}
            ></i>
            <i
              class="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts();
      dispatch(SetLoader(false));
      if (response.success) {
        setProduct(response.products);
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
      <div className="flex justify-end">
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
      <Table className="mt-3" columns={columns} dataSource={products}></Table>

      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        ></ProductsForm>
      )}
    </div>
  );
}

export default Products;
