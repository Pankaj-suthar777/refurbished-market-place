import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loadersSlice";
import { GetAllBids } from "../../../apicalls/product";
import Divider from "../../../components/Divider";
import moment from "moment";

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBidsData] = useState();
  const dispatch = useDispatch();

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({
        product: selectedProduct._id,
      });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }

  useEffect(() => {
    if (selectedProduct) {
      getData();
    }
  }, [selectedProduct]);

  return (
    <Modal
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
      centered
      footer={null}
      width={500}
    >
      <div className="flex flex-col gap-5">
        <h1 className="text-primary">Bids</h1>

        {bidsData > 5 && (
          <>
            <Divider></Divider>
            <h1 className="text-xl text-gray-500">
              Product Name : {selectedProduct.name}
            </h1>
          </>
        )}

        {bidsData < 1 && (
          <>
            <h1 className="text-xl text-gray-500">There is no bids</h1>
          </>
        )}
        {bidsData &&
          bidsData.map((bid) => {
            return (
              <div className="border border-solid border-gray-500 p-2 rounded-lg">
                <h1>Name : {bid.buyer.name}</h1>
                <h1>Bid Amount : {bid.bidAmount}</h1>
                <h1>
                  Bid Date : {moment(bid.createdAt).format("DD-MM-YY hh:mm A")}
                </h1>
                <h1>Message : {bid.message}</h1>
                <h1>Phone : {bid.mobile}</h1>
                <h1>Email : {bid.buyer.email}</h1>
              </div>
            );
          })}
      </div>
    </Modal>
  );
}

export default Bids;
