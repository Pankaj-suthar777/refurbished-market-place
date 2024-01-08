import { Checkbox, Col, Form, Input, Modal, Row, Tabs, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { AddProduct, EditProduct } from "../../../apicalls/product";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import Images from "./Images";
const additionalThings = [
  {
    label: "Bill Available",
    name: "billAvailable",
  },
  {
    label: "Warranty Available",
    name: "warrantyAvailable",
  },
  {
    label: "Accessories Available",
    name: "accessoriesAvailable",
  },
  {
    label: "Box Available",
    name: "boxAvailable",
  },
];

const rules = [
  {
    required: true,
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) {
  const [selectedTab, setSelectedTab] = useState("1");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const formRef = useRef(null);

  async function onFinish(values) {
    // for checkbox true/false value
    const updatedValues = {
      ...values,
      billAvailable: values.billAvailable || false,
      warrantyAvailable: values.warrantyAvailable || false,
      accessoriesAvailable: values.accessoriesAvailable || false,
      boxAvailable: values.boxAvailable || false,
    };

    try {
      dispatch(SetLoader(true));
      let response = null;
      if (selectedProduct) {
        response = await EditProduct(selectedProduct._id, updatedValues);
      } else {
        updatedValues.seller = user._id;
        updatedValues.status = "pending";
        response = await AddProduct(updatedValues);
      }

      dispatch(SetLoader(false));
      setShowProductForm(false);
      if (response.success) {
        getData();
        message.success(response.message);
      } else {
        dispatch(SetLoader(false));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.messgae);
    }
  }

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);

  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
      {...(selectedTab === "2" && { footer: false })}
    >
      <div>
        <p className="text-xl text-center font-semibold text-primary">
          {selectedProduct ? "Edit Product" : "Add Product"}
        </p>
        <Tabs
          defaultActiveKey="1"
          activeKey={selectedTab}
          onChange={(key) => setSelectedTab(key)}
        >
          <Tabs.TabPane key="1" tab="General">
            <Form layout="vertical" onFinish={onFinish} ref={formRef}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text"></Input>
              </Form.Item>

              <Form.Item label="Description" name="description" rules={rules}>
                <Input type="text"></Input>
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="books">Books</option>
                      <option value="sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number"></Input>
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex flex-wrap">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      name={item.name}
                      key={item.name}
                      valuePropName="checked"
                      className="mr-2"
                    >
                      <Checkbox>{item.name}</Checkbox>
                    </Form.Item>
                  );
                })}
              </div>
              <Form.Item
                name="showBidsOnProductPage"
                valuePropName="checked"
                className="mr-2"
              >
                <Checkbox>Show Bids on Product Page</Checkbox>
              </Form.Item>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" tab="Images" disabled={!selectedProduct}>
            <Images
              selectedProduct={selectedProduct}
              showProductForm={showProductForm}
              getData={getData}
              setShowProductForm={setShowProductForm}
            ></Images>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
