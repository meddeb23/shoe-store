import React from "react";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(elements.getElement(CardElement));
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      console.log("Stripe 23 | token generated!", paymentMethod);
      try {
        const { id } = paymentMethod;
        const response = await axios.post("/api/v1/checkout/pay", {
          amount,
          id: id,
        });

        console.log("Stripe 35 | data", response.data.success);
        if (response.data.success) {
          console.log("CheckoutForm.js 25 | payment successful!");
        }
      } catch (error) {
        console.log("CheckoutForm.js 28 | ", error);
      }
    } else {
      console.log(error.message);
    }
  };
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#2d2d2d",
        color: "#2d2d2d",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        padding: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#cbcbcb" },
        "::placeholder": { color: "#cbcbcb" },
      },
      invalid: {
        iconColor: "#cc0000",
        color: "#cc0000",
      },
    },
  };

  return (
    <div className="bg-white rounded-md px-4 py-8">
      <h1 className="font-bold text-gray-800 text-3xl text-center p-4">
        checkout
      </h1>
      {stripe ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="Password" className="block font-semibold text-left">
            Name
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 my-2"
            name="name"
            placeholder="Full name"
          />
          <label htmlFor="Password" className="block font-semibold text-left">
            State
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 my-2"
            name="state"
            placeholder="State"
          />
          <label htmlFor="Password" className="block font-semibold text-left">
            Card Information
          </label>
          <div className="w-full border-2 py-3 border-gray-300 rounded-lg px-4 my-2">
            <CardElement />
          </div>
          <div className="text-gray-800 font-bold p-4">
            Amount To pay <span>${amount}</span>
          </div>
          <button className="w-full py-2 rounded-md cursor-pointer font-bold text-white text-center bg-pink-500">
            Pay
          </button>
        </form>
      ) : (
        <h1 className="font-bold text-red-500 text-center">
          oops Can't connect to stripe Please check another payment methode
        </h1>
      )}
    </div>
  );
}
