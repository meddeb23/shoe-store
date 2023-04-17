import React from "react";
import { NavLink } from "react-router-dom";

import shoes_img2 from "../../images/shoes-img2.png";

export default function Hero() {
  return (
    <section
      className="h-screen px-2 md:px-8 flex bg-indigo-700  items-center justify-center"
      // style={{ background: "linear-gradient(45deg,#3a3a3a, #1b1b1b)" }}
    >
      <div className="flex flex-col md:flex-row text-center md:text-left md:items-center md:space-x-12 lg:space-x-28">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-white  max-w-md text-5xl xl:text-6xl font-bold">
            New Shoes Collection
          </h1>
          <p className="text-gray-300 text-sm max-w-sm mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore
          </p>
          <NavLink
            to="/shose"
            className="block  mt-8 bg-pink-600 w-32 rounded-md p-2 text-center"
          >
            <span className="text-white font-bold ">Discover</span>
          </NavLink>
        </div>
        <div className="hidden md:block w-60 md:w-80 xl:w-96 mx-auto mt-4">
          <img src={shoes_img2} alt="" />
        </div>
      </div>
    </section>
  );
}
