import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import { GetProducts, GetProductsBySearch } from "../../apicalls/product";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

function Home() {
  const [products, setProducts] = useState([]);

  const [showSearch, setShowSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
    search: "",
  });
  const { user } = useSelector((state) => state.users);

  async function getData() {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5">
      <Filters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        getData={getData}
      ></Filters>

      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center ">
          <i
            className="ri-equalizer-line text-xl cursor-pointer"
            onClick={() => setShowFilters(!showFilters)}
          ></i>
          <input
            type="text"
            placeholder="Search Products here..."
            className="border border-gray-300 rounded border-solid w-full h-14 p-2"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          ></input>
          {showSearch === false ? (
            <i
              className="ri-search-line cursor-pointer"
              onClick={() => {
                // GetProductBySearch({ name: searchQuery });
                // setShowSearch(true);
                naviagte(`/search?q=${searchQuery}`);
              }}
            ></i>
          ) : (
            <i
              class="ri-close-line cursor-pointer"
              onClick={() => {
                // setShowSearch(false);
                setSearchQuery("");
              }}
            ></i>
          )}
        </div>
        {/* {showSearch && <Search products={searchData}></Search>}
        {showSearch === false && ( */}
        <div
          className="xl:grid-cols-6  lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-3 grid 
          "
        >
          {products?.map((product) => {
            return (
              <div
                className="border border-gray-300 rounded border-solid flex flex-col gap-1 pb-2 cursor-pointer"
                onClick={() => naviagte(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  alt="img"
                  className="w-full rounded-lg p-2 h-40 object-cover"
                ></img>
                <div className="px-2 flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">{product.description}</p>
                  <Divider></Divider>
                  <span className="text-xl font-semibold text-green-700">
                    &#8377;{product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/* )} */}
      </div>
    </div>
  );
}

export default Home;
