import React, { useEffect, useState } from "react";

import Footer from "../components/footer/footer";
import NavBar from "../components/navBar/NavBar";
import ProdDetail from "../components/ProductDisplay/ProdDetail";
import ProductGrid from "../components/ProductDisplay/ProductGrid";

import Axios from "axios";
import { useRouteMatch } from "react-router-dom";
import Loader from "../components/loader/loader";
import Alert from "../components/alert/Alert";

export default function ProductDetail() {
  const [prod, setProd] = useState(null);
  const [products, setProducts] = useState([]);
  const [isloading1, setIsLoading1] = useState(false);
  const [isloading2, setIsLoading2] = useState(false);
  const [alert, setAlert] = useState(null);

  let match = useRouteMatch();

  useEffect(() => {
    setIsLoading1(true);

    Axios.get("/api/v1/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading1(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading1(false);
      });
  }, []);
  useEffect(() => {
    setIsLoading2(true);

    Axios.get(`/api/v1/products/${match.params.id}`)
      .then((res) => {
        setProd(res.data);
        setIsLoading2(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading2(false);
      });
  }, [match.params.id]);
  return (
    <>
      <NavBar />
      {alert && <Alert type={alert.type} msg={alert.msg} setAlert={setAlert} />}
      <div className="min-h-screen bg-indigo-700 flex items-center">
        {isloading2 ? (
          <Loader />
        ) : (
          prod && <ProdDetail prod={prod} setAlert={setAlert} />
        )}
      </div>

      <>
        {products.length !== 0 ? (
          <ProductGrid name="Recomendation" products={products} />
        ) : (
          <div className="ErrorLoading">Error Loading!</div>
        )}
        {/* <Footer /> */}
      </>
    </>
  );
}
