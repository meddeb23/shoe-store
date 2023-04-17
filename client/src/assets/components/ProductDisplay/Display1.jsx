import React from "react";
import { NavLink } from "react-router-dom";

export default function Display1({ prod }) {
  return (
    <div className="flex flex-col items-center p-4 my-2 w-full mx-auto bg-white rounded-md shadow-md ">
      <NavLink to={`/shoe/${prod._id}`}>
        <img src={`/${prod.image}`} alt={prod.name} className="w-40 mb-3" />
      </NavLink>
      <div className="text-xl font-bold text-gray-700">{prod.name}</div>
      <div className="text-xs font-bold text-gray-400">
        The Diversity of Enhance
      </div>
      <div className="font-bold text-md text-blue-800 my-2">${prod.price}</div>
      <NavLink to={`/shoe/${prod._id}`}>
        <p className="bg-blue-800 rounded-md p-2 text-white font-bold">
          add to cart
        </p>
      </NavLink>
    </div>
  );
}
