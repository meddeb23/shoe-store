import React from "react";
import SectionTitle from "../section header/SectionTitle";
import Display1 from "./Display1";

export default function ProductGrid({ name, products }) {
  return (
    <div>
      {name && (
        <div>
          <SectionTitle title={name} />
          {/* <div className="main-btn bg-3" style={{ margin: "10px 0" }}>
          Discover
      </div> */}
        </div>
      )}
      <div className="mt-8 px-4 grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Display1 key={product._id} prod={product} />
        ))}
      </div>
    </div>
  );
}
