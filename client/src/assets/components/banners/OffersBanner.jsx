import React from "react";
import { NavLink } from "react-router-dom";

export default function OffersBanner({ name, discount, img }) {
  return (
    <section
      style={{ backgroundColor: "#333333" }}
      className="py-6 px-2 lg:py-10 flex flex-col md:flex-row justify-around items-center"
    >
      <div className="text">
        <div className="font-bold text-white text-xl">{name}</div>
        <div className="font-bold text-white text-3xl">
          {discount}
          <br />
          Discount
        </div>
        <NavLink to="/shoe">
          <div className="bg-blue-700 rounded-md p-2 mt-4 text-white text-center">
            buy now
          </div>
        </NavLink>
      </div>
      {img && <img src={img} className="w-60 m-4" />}
    </section>
  );
}
