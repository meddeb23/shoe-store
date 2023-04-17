import React from "react";
import { NavLink } from "react-router-dom";

export default function Display2({ prod }) {
  return (
    <div className="prod-2">
      <div className="background">
        <NavLink to={`/shoe/${prod._id}`}>
          <img src={`/${prod.image}`} alt={prod.name} />
        </NavLink>
        <div className="prod-name">{prod.name}</div>
        <div className="prod-2-footer">
          <div className="price">${prod.price}</div>
          <NavLink to={`/shoe/${prod._id}`}>
            <p className="btn">Buy</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
