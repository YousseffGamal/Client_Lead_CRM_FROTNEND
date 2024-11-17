import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../../axios";
import { useAuth } from "../../store/authContext";

const stripePromise = loadStripe(
  "pk_test_51Q80mHP87h1xa3fv9AFyA8VeE2kYVqCukgdOCgfTCuabLJWXn5lHb7gbOCFG8DwdvKqxXRUW3dWQsL6cxP4pi8C400Q8JfEChP"
);

function PaymentForm({ handleClose, clientSecret, customerId }) {
  const { auth, setAuth } = useAuth();

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Confirm the payment setup
    if (clientSecret) {
      const { setupIntent, error } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: auth.user.firstName, // Use the user's real name
            },
          },
          return_url: "http://localhost:5173/dashboard",
        },
        redirect: "if_required",
      });

      if (error) {
        console.error("Error:", error.message);
      } else {
        const response = await axiosInstance.post("save-payment-method", {
          customerId,
          paymentMethodId: setupIntent.payment_method,
          userID: auth.user._id,
        });

        const { success } = response.data;

        if (success) {
          console.log("customerId", customerId);
          alert("Card saved successfully!");
          const updatedAuth = {
            ...auth,
            paymentMethodVerified: true,
            user: {
              ...auth.user,
              customerId,
            },
          };
          setAuth(updatedAuth);
          console.log("cameHerepaymentForm");
          localStorage.setItem("paymentMethodVerified", true);
          handleClose(customerId);
        } else {
          alert("Failed to save card info!");
        }
      }
    } else {
      console.error("Client secret is not defined.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ maxWidth: "400px", margin: "0 auto" }}
    >
      <label style={{ fontWeight: "bold", marginBottom: "5px" }}>
        Payment Information
      </label>
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          backgroundColor: "#fff",
        }}
      >
        <PaymentElement
          options={{
            layout: "tabs", // You can change this to 'accordion' or 'accordion-tabs' based on your preference
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginTop: "10px",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Save Payment Method
      </button>
    </form>
  );
}

export default function PaymentIntentForm({
  handleClose,
  clientSecret,
  customerId,
}) {
  const appearance = {
    theme: "stripe",
  };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
      <PaymentForm
        handleClose={handleClose}
        clientSecret={clientSecret}
        customerId={customerId}
      />
    </Elements>
  );
}
