import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import axiosInstance from "../../axios";
import CheckOutForm from "../CheckOutForm/CheckOutForm";
import { useAuth } from "../../store/authContext";

const stripePromise = loadStripe(
  "pk_test_51Q80mHP87h1xa3fv9AFyA8VeE2kYVqCukgdOCgfTCuabLJWXn5lHb7gbOCFG8DwdvKqxXRUW3dWQsL6cxP4pi8C400Q8JfEChP"
);

const CheckOutComponent = ({ amount, handleClose, leadId }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [customerId, setCustomerId] = useState("");
  const { auth } = useAuth();
  useEffect(() => {
    const createPaymentIntent = async () => {
      const { data } = await axiosInstance.post("/createPaymentIntent", {
        amount: amount * 1000,
        email: auth.user.email,
        name: auth.user.firstName,
      });
      console.log("datacamefromback", data);
      setClientSecret(data.clientSecret);
      setCustomerId(data.customerId);
    };

    createPaymentIntent();
  }, [amount]);
  if (!clientSecret) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <h1>Stripe Payment</h1>
      <CheckOutForm
        leadId={leadId}
        clientSecret={clientSecret}
        customerId={customerId}
        handleClose={handleClose}
        amount={amount}
      />
    </Elements>
  );
};

export default CheckOutComponent;
