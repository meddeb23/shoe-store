import React, { useState } from "react";
import CollectionsBanner from "../components/banners/CategoryBanner";
import ExploreBanner from "../components/banners/ExploreBanner";
import PartnersBanner from "../components/banners/Partners";

import Hero from "../components/hero/Hero";
import NavBar from "../components/navBar/NavBar";
import BestSeller from "../components/ProductDisplay/BestSeller";
import Footer from "../components/footer/footer";
import OffersBanner from "../components/banners/OffersBanner";

import offerImg from "../images/discount image.png";

export default function Home() {
  const [loading, setLoading] = useState(false);

  // setTimeout(() => setLoading(false), 1000);

  return (
    <>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <NavBar />
          <Hero />
          <BestSeller name="Best Seller" />
          <OffersBanner name="Special Offer" img={offerImg} discount="50%" />
          <CollectionsBanner />
          <BestSeller name="New Product" />
          <ExploreBanner />
          <Footer />
        </>
      )}
    </>
  );
}
