import { Checkbox, Col, Form, Input, Modal, Row, Tabs } from "antd";
import React, { useRef } from "react";

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

function ProductsForm({ showProductForm, setShowProductForm }) {
  const formRef = useRef(null);

  function onFinish(values) {
    const updatedValues = {
      ...values,
      billAvailable: values.billAvailable || false,
      warrantyAvailable: values.warrantyAvailable || false,
      accessoriesAvailable: values.accessoriesAvailable || false,
      boxAvailable: values.boxAvailable || false,
    };
    console.log(updatedValues);
  }

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
    >
      <Tabs defaultActiveKey="1">
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
            <div className="flex gap-10">
              {additionalThings.map((item) => {
                return (
                  <Form.Item
                    name={item.name}
                    key={item.name}
                    valuePropName="checked" // Use "checked" for Checkbox
                  >
                    <Checkbox>{item.name}</Checkbox>
                  </Form.Item>
                );
              })}
            </div>
          </Form>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="Images">
          <h1>Images</h1>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default ProductsForm;
