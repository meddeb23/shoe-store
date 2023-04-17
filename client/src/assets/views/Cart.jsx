import Axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/navBar/NavBar";
import Loader from "../components/loader/loader";
import Counter from "../components/Counter";
import StripeContainer from "../components/stripe/StripeContainer";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [cartInfo, setCartInfo] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isopen, setIsopen] = useState(false);

  const getCartList = () => {
    setIsFetching(true);
    Axios.get("/api/v1/cart")
      .then((res) => {
        setCartList(res.data.items);
        console.log(res.data.items);
        setCartInfo({ _id: res.data._id, total: res.data.total });
        setIsFetching(false);
      })
      .catch((err) => {
        setIsFetching(false);
        console.log(err);
      });
  };
  const deleteCartItem = (prod) => {
    Axios.delete(`/api/v1/cart/delete/${prod._id}`)
      .then((res) => {
        if (res.status === 200) {
          setCartList(cartList.filter((item) => item._id !== prod._id));
          setCartInfo({
            ...cartInfo,
            total: cartInfo.total - prod.price * prod.quantity,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCartList();
  }, []);

  return (
    <>
      <NavBar />
      <section className="flex items-start justify-around bg-indigo-700 min-h-screen pt-24 md:px-8 ">
        <div className="w-full max-w-2xl md:w-7/12 mx-auto md:mx-0">
          {/* <SectionTitle title="Your Shopping Cart" /> */}
          <h1 className="text-white mb-4 text-center font-bold text-3xl">
            Cart
          </h1>

          {isFetching ? (
            <Loader />
          ) : (
            <>
              <div className="flex items-center justify-between px-6">
                <div
                  onClick={() => setSelectAll(!selectAll)}
                  className="flex items-center space-x-2"
                >
                  <div
                    className={`${
                      selectAll
                        ? "border-pink-500 bg-pink-500"
                        : "border-gray-300"
                    } text-white border-2 cursor-pointer rounded-md h-4 w-4`}
                  >
                    {selectAll && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-xs text-gray-300">Select All</div>
                </div>
                <div
                  onClick={() => setIsopen(true)}
                  className="lg:hidden py-2 px-4 bg-pink-500 rounded-md text-white font-semibold"
                >
                  Checkout
                </div>
              </div>
              <div className="py-4 ">
                {cartList.length !== 0 ? (
                  cartList.map((item) => (
                    <div
                      className="my-2 p-2 md:px-8 relative bg-white shadow-md rounded-md flex items-center justify-between"
                      key={item._id}
                    >
                      <svg
                        className="absolute top-2 right-3 hover:text-red-500 w-4 h-4 cursor-pointer"
                        onClick={() => deleteCartItem(item)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <NavLink to={`/shoe/${item.product_id}`}>
                        <img
                          src={`/${item.product_image}`}
                          className="w-24 h-20"
                        />
                      </NavLink>
                      <div className="md:flex items-center md:space-x-10">
                        <div>
                          <h3 className="font-bold text-lg">
                            {item.product_name}
                          </h3>
                          <h3 className="font-semibold text-xs text-gray-300">
                            {item.size}, {item.color}
                          </h3>
                        </div>
                        <Counter
                          setQuantity={() => {}}
                          quantity={item.quantity}
                          className="flex flex-row items-center space-x-2 border-2 font-bold px-2 h-8 rounded-lg my-2"
                        />
                      </div>
                      <div className="md:flex items-center space-x-8">
                        <h3 className="font-bold text-lg">${item.price}.000</h3>
                      </div>
                    </div>
                  ))
                ) : (
                  <h1
                    className="h-40 flex justify-center items-center text-white"
                    style={{ textAlign: "center" }}
                  >
                    Cart is Empty
                  </h1>
                )}
              </div>
              <div className="pb-6 px-4">
                <div className="flex flex-col-reverse md:flex-row items-center justify-center md:justify-between">
                  <NavLink to="/shose">
                    <p className="text-xs" style={{ color: "#cbcbcb" }}>
                      back to shop
                    </p>
                  </NavLink>
                  <h2 className="text-pink-500 text-lg font-semibold">
                    Total : ${cartInfo.total}.000
                  </h2>
                </div>
              </div>
            </>
          )}
        </div>
        {cartList.length !== 0 && (
          <div
            style={{
              transition: "left 300ms ease-in-out",
              left: isopen ? "0" : "100%",
            }}
            className="overflow-auto block fixed top-16 md:static w-full  md:w-72 lg:w-96"
          >
            <svg
              onClick={() => setIsopen(false)}
              className="w-5 h-5 text-red-400 md:hidden absolute top-4 left-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <StripeContainer amount={cartInfo.total} />
          </div>
        )}
      </section>
    </>
  );
}
