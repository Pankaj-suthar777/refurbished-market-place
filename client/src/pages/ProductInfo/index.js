import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { Button, message } from "antd";
import { GetAllBids, GetProductById } from "../../apicalls/product";
import Divider from "../../components/Divider";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BidModel from "./BidModel";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
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
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({ ...response.data, bids: bidsResponse.data });
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
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-3">
        {/*image*/}
        <div className="flex flex-col gap-5">
          <a href={product.images[selectedImageIndex]}>
            <img
              className="w-full h-96 object-cover rounded-md"
              src={product.images[selectedImageIndex]}
              alt=""
            ></img>
          </a>
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
        <div className="md:hidden">
          <Divider></Divider>
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
            <div className="flex justify-between mt-2">
              <span>Purchasd Year</span>
              <span>
                {moment().subtract(product.age, "years").format("YYYY")} (
                {product.age} years ago)
              </span>
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
          <Divider></Divider>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold text-orange-900">Bids</h1>
              <Button
                onClick={() => setShowAddNewBid(!showAddNewBid)}
                disabled={user._id === product.seller._id}
              >
                New Bid
              </Button>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              {product.showBidsOnProductPage &&
                product?.bids?.map((bid) => {
                  return (
                    <div className="border border-gray-400 border-solid p-3 rounded-lg flex flex-col gap-3">
                      <div className="flex justify-between">
                        <span>Name</span>
                        <span>{bid.buyer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bid amount</span>
                        <span>&#8377; {bid.bidAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bid Place On</span>
                        <span>
                          {moment(bid.createdAt).format("MMM D , YYYY hh:mm A")}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        {showAddNewBid && (
          <BidModel
            getData={getData}
            showBidModal={showAddNewBid}
            setShowBidModel={setShowAddNewBid}
            product={product}
          ></BidModel>
        )}
      </div>
    )
  );
}

export default ProductInfo;
