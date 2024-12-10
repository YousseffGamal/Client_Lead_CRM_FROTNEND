import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axiosInstance from "../../axios";
import { useAuth } from "../../store/authContext";
import "./CheckOutForm.css"; // Add a separate CSS file or CSS module

const CheckOutForm = ({
  clientSecret,
  customerId,
  handleClose,
  leadId,
  amount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [saveInfo, setSaveInfo] = useState(false);
  const { auth } = useAuth();

  const paymentElementOptions = {
    layout: "tabs",
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    try {
      const { error: confirmError, paymentIntent } =
        await stripe.confirmPayment({
          elements,
          payment_method_data: {
            billing_details: {
              name: auth.user.firstName, // Pass the user's name here
              email: auth.user.email, // Include email if needed
              phone: auth.user.phone, // Include phone if needed
            },
          },
          confirmParams: { return_url: "http://localhost:5173/dashboard" },
          redirect: "if_required",
        });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        setSuccess("Payment successful!");
        alert("Payment successful!");
        console.log(paymentIntent.payment_method);
        await axiosInstance.post("/handlesuccessLeadPurchase", {
          paymentMethodId: paymentIntent.payment_method,
          customerId,
          userID: auth.user._id,
          savePaymentInfo: saveInfo ? true : false,
          leadId: leadId,
          amount: amount,
        });

        handleClose(saveInfo ? customerId : "");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <PaymentElement
        options={paymentElementOptions}
        className="payment-element"
      />
      <label className="save-info">
        <input
          type="checkbox"
          checked={saveInfo}
          onChange={() => setSaveInfo(!saveInfo)}
        />
        Save my payment information for future use
      </label>
      <button
        type="submit"
        disabled={!stripe || !clientSecret}
        className="pay-button"
      >
        Pay
      </button>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
    </form>
  );
};

export default CheckOutForm;
