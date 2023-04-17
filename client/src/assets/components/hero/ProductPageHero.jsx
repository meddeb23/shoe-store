import React from "react";
import shoes_img2 from "../../images/chuttersnap-CLAWRoZtlAg-unsplash.jpg";

export default function ProductPageHero() {
  return (
    <section className="relative h-96 bg-indigo-500">
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <h1 className="font-bold text-6xl text-pink-600 w-full p-8 text-center">
          ready for a run
        </h1>
      </div>
      <img
        src={shoes_img2}
        alt="Addidas sport sneaker"
        className="h-full w-full object-cover"
      />
    </section>
  );
}
