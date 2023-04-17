import React from "react";

export default function SpecialOffer({ offer }) {
  return (
    <section className="specialOffer">
      <div className="offer-header">
        <h1>Special Offer</h1>
        <h1>{offer.time}</h1>
      </div>
      <div className="warpper">
        <div className="card">
          <h1>{offer.name}</h1>
          <div className="color">
            <p>Colors:</p>
            {offer.color.map((i) => (
              <span
                key={`${i}${offer.id}`}
                style={{ backgroundColor: i }}
              ></span>
            ))}
          </div>
          <div className="size">
            <p>Size:</p>
            {offer.size.map((i) => (
              <span key={`${i}${offer.id}`}>{i}</span>
            ))}
          </div>
          <div className="card-footer">
            <div className="price">${offer.price}</div>
            <div className="btn">Get th Offer</div>
          </div>
        </div>
        <img src={offer.img} alt={`offer ${offer.name}`} />
      </div>
    </section>
  );
}
