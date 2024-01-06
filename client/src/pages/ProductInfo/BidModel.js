import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { PlaceNewBid } from "../../apicalls/product";
import { AddNotification } from "../../apicalls/Notifications";

function BidModel({ showBidModal, setShowBidModel, getData, product }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const rules = [
    {
      required: true,
      message: "Required",
    },
  ];

  async function onFinish(values) {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);

        // send notification to seller
        await AddNotification({
          title: "A new bid has been placed",
          message: `A new bid has been placed on your product ${product.name} by ${user.name} for ₹${values.bidAmount}`,
          user: product.seller._id,
          onClick: "/profile",
          read: false,
        });

        getData();
        setShowBidModel(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  }

  return (
    <Modal
      onCancel={() => setShowBidModel(false)}
      open={showBidModal}
      centered
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          New Bid
        </h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input></Input>
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea></Input.TextArea>
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number"></Input>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModel;
