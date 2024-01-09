import { Divider, message } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetProductsBySearch } from "../../apicalls/product";

function Search() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const q = queryParams.get("q");

  async function GetProductBySearch() {
    try {
      const response = await GetProductsBySearch({ name: q });
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
  }
  useEffect(() => {
    GetProductBySearch();
  }, []);

  return (
    <div
      className="xl:grid-cols-6  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 overflow-auto grid 
          "
    >
      {products.length > 0 ? (
        products?.map((product) => {
          return (
            <div
              key={product._id}
              className="border border-gray-300 rounded border-solid flex flex-col gap-1 pb-2 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <img
                src={product.images[0]}
                alt="img"
                className="w-full rounded-lg p-2 h-40 object-cover"
              ></img>
              <div className="px-2 flex flex-col gap-1">
                <h1 className="text-lg font-semibold">{product.name}</h1>
                <p className="text-sm">{product.description}</p>

                <span className="text-xl mt-2 font-semibold text-green-700">
                  &#8377;{product.price}
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex mt-[50%] justify-center items-center">
          <h1 className="text-3xl overflow-hidden">No Product Found</h1>
        </div>
      )}
    </div>
  );
}

export default Search;
