import Axios from "axios";
import React, { useState, useEffect } from "react";
import SectionTitle from "../section header/SectionTitle";

import Display1 from "./Display1";

export default function BestSeller({ name }) {
  const [products, setProduct] = useState([]);

  const getBestSeller = () => {
    Axios.get("/api/v1/products/best-seller")
      .then((res) => setProduct(res.data.products))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  return (
    <div className="bg-gray-200 py-6">
      {name && (
        <div className="flex flex-row justify-around">
          <SectionTitle title={name} />
          {/* <div className="main-btn bg-3" style={{ margin: "10px 0" }}>
            Discover
          </div> */}
        </div>
      )}
      <div className="mt-8 px-4 grid md:grid-cols-3 gap-10">
        {products.length !== 0 ? (
          products.map((prod) => <Display1 key={prod._id} prod={prod} />)
        ) : (
          <div className="">Error Loading!</div>
        )}
      </div>
    </div>
  );
}
