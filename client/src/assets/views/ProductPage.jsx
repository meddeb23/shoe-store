import React, { useState, useEffect, useContext } from "react";

import Footer from "../components/footer/footer";
import ProductGrid from "../components/ProductDisplay/ProductGrid";

import Axios from "axios";

import NavBar from "../components/navBar/NavBar";
import ProductPageHero from "../components/hero/ProductPageHero";
import Loader from "../components/loader/loader";
import { SearchContext } from "../components/context/SearchContext";

export default function ProductPage() {
  const { search, setSearch } = useContext(SearchContext);

  const [products, setProducts] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  const onFetchProduct = (q) => {
    let url = "/api/v1/products/find";
    if (q) {
      url += "?q=" + q;
    }
    Axios.get(url)
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const onSearch = (e) => {
    e.preventDefault();
    onFetchProduct(search);
  };

  useEffect(() => {
    setIsLoading(true);
    if (search) {
      onFetchProduct(search);
    } else {
      onFetchProduct();
    }
  }, []);

  return (
    <>
      <NavBar />
      <ProductPageHero />
      <div className="grid md:grid-cols-6">
        {/* <div className="md:col-span-2 bg-green-400">
          filters
        </div> */}
        <div className="md:col-span-4 md:col-start-2">
          {/* Controle bar */}
          <div className="rounded-md bg-indigo-500 m-2 shadow-md">
            <div className="flex text-white py-2 items-center justify-around">
              <div className="filter">
                <svg
                  className="w-4 h-4 inline-block mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" />
                </svg>
                filter
              </div>
              <div className="sort">
                <svg
                  className="w-4 h-4 inline-block mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                </svg>
                sort
              </div>
              <div className="onStore">onStore</div>
              <form
                onSubmit={(e) => onSearch(e)}
                className="hidden lg:flex py-2 px-4 items-center"
              >
                <svg
                  className="w-5 h-5 mr-2 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  value={search}
                  className="w-full bg-transparent placeholder-white outline-none"
                  placeholder="Search products..."
                />
              </form>
            </div>
          </div>
          {/* Search bar */}
          <form
            onSubmit={(e) => onSearch(e)}
            className=" lg:hidden rounded-md border-2 border-gray-300 
          m-2 py-2 px-4 shadow-md flex items-center text-gray-600"
          >
            <svg
              className="w-5 h-5 mr-2 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              value={search}
              className="w-full bg-transparent  outline-none"
              placeholder="Search products..."
            />
          </form>
          {/* Product list */}
          <div>
            {products.length !== 0 ? (
              <ProductGrid products={products} />
            ) : isloading ? (
              <div className="w-full  h-80 relative">
                <Loader color={"#4338ca"} />
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center text-red-500">
                No product match your characteristic!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}
