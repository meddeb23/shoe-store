import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Counter from "../Counter";

export default function ProdDetail({ prod, setAlert }) {
  const [size, setSize] = useState(
    prod.size.length !== 0 ? prod.size[0] : null
  );
  const [color, setColor] = useState(
    prod.colors.length !== 0 ? prod.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  let history = useHistory();

  const onAddToCart = (e) => {
    const new_item = {
      product_id: prod._id,
      product_name: prod.name,
      product_image: prod.image,
      size,
      color,
      quantity,
      price: prod.price,
      quantity,
    };
    setIsLoading(true);
    Axios.post("/api/v1/cart/insert", new_item)
      .then((res) => {
        setAlert({ type: "success", msg: "Item added to cart" });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        if (err.response) {
          if (err.response.status === 401) {
            history.replace("/login");
          }
        }

        console.log(err.response);
        console.log(err);
      });
  };

  return (
    <section className="w-full pt-14 md:flex md:flex-row-reverse md:items-center md:justify-around md:pt-16">
      <div className="">
        <img
          src={`/${prod.image}`}
          alt={prod.name}
          className="w-64 h-52 md:w-72 md:h-60 lg:w-96 lg:h-80 mx-auto my-2"
        />
      </div>
      <div className="p-8 text-white font-bold">
        <div>
          <h2>Sports</h2>
          <h1 className="text-4xl lg:text-6xl text-pink-600">{prod.name}</h1>
          <p className="text-sm mt-2 font-normal text-gray-200">
            The Software of Full-Featured Comparison
          </p>
          <div className="my-4 flex flex-row items-center space-x-2">
            <div
              className="rounded-full px-3 py-1 font-semibold cursor-pointer"
              style={{ backgroundColor: "#f25555" }}
            >
              new
            </div>
            <div
              className="rounded-full px-3 py-1 font-semibold cursor-pointer"
              style={{ backgroundColor: "#4a94d1" }}
            >
              discount
            </div>
          </div>
          <div className="flex flex-row space-x-8">
            <div>
              <p>Colors:</p>
              <div className="flex flex-row space-x-2">
                {prod.colors.map((i) => (
                  <div
                    className="w-8 h-8 rounded-full p-1"
                    key={`${i}${prod.id}`}
                    style={{
                      backgroundColor: i,
                    }}
                    onClick={() => setColor(i)}
                  >
                    {i === color && (
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
                ))}
              </div>
            </div>
            <div className="size">
              <p>Size:</p>
              <div className="flex flex-row space-x-2">
                {prod.size.map((i) => (
                  <div
                    className={`${
                      i === size ? "text-pink-500" : "text-gray-300"
                    } h-8 rounded-full py-1`}
                    key={`${i}${prod.id}`}
                    onClick={() => setSize(i)}
                  >
                    {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row items-center space-x-6 my-3">
              <Counter setQuantity={setQuantity} quantity={quantity} />
              <h2 className="my-4 text-2xl">${prod.price}.000</h2>
            </div>
            <button
              onClick={() => onAddToCart()}
              className="bg-pink-500 rounded-md py-2 px-4 w-full"
            >
              {isLoading ? "adding..." : "Add To Cart"}
            </button>
          </div>
        </div>
        {/* <div className="buy-btn">Add to cart</div> */}
      </div>
    </section>
  );
}
