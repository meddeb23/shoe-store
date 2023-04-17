import React from "react";

import img1 from "../../images/brand-1.jpg";
import img2 from "../../images/brand-2.jpg";
import img3 from "../../images/brand-3.jpg";
import img4 from "../../images/brand-4.jpg";
import img5 from "../../images/brand-5.jpg";
import SectionTitle from "../section header/SectionTitle";

export default function PartnersBanner() {
  const brandes = [img1, img2, img3, img4, img5];
  return (
    <section className="partners">
      <SectionTitle title="our partners" />
      <div className="container flex-row">
        {brandes.map((brand) => (
          <img src={brand} alt="" key={Math.floor(Math.random() * 10000)} />
        ))}
      </div>
    </section>
  );
}
