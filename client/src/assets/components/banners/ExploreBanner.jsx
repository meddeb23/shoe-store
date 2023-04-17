import React from "react";
import { NavLink } from "react-router-dom";

export default function ExploreBanner() {
  return (
    <section className="explore">
      <div className="text">
        <h1>Explore The New Brand Shoes</h1>
        <NavLink to="/shose">
          <div className="main-btn bg-2 mrt">
            Explore
            </div>
        </NavLink>
      </div>
    </section>
  );
}
