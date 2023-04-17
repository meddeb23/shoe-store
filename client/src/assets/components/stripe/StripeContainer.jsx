import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51ICkNTB0fqH0MuufIxuWH5vGfDXnTur0QfpG38BfmDzEXHMGd7BligKrikyHYp8pm67Dbu2ChulsjVi3z0j1VD5t00C1s81nZC";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromis = loadStripe(PUBLIC_KEY);

export default function StripeContainer({ amount }) {
  return (
    <Elements stripe={stripePromis}>
      <CheckoutForm amount={amount} />
    </Elements>
  );
}
