import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import { useAuth } from "../../store/authContext";
import "./PaymentMethod.css"; // Assuming you have a CSS file for styles

const PaymentMethodSelector = ({ amount, handleClose, leadId }) => {
  const { auth } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethodId, setSelectedMethodId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      console.log(selectedMethodId);
      const response = await axiosInstance.post(
        "/paymentWithSelectedPaymentMethod",
        {
          paymentMethodId: selectedMethodId,
          customerId: auth.user.CustomerId,
          amount,
          currency: "usd",
          userID: auth.user._id,
          leadId: leadId,
        }
      );
      console.log(response);
      if (response.data.success) {
        alert("Payment successful!");
        handleClose();
      } else {
        alert("Payment failed: " + response.data.error);
      }
    } catch (error) {
      alert("Error making payment: " + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      console.log("auth", auth.user.CustomerId);
      const response = await axiosInstance.get(
        `saved-payment-methods-for-user/${auth.user.CustomerId}`
      );
      setPaymentMethods(response.data.paymentMethods);
    };
    fetchPaymentMethods();
  }, [auth.user.CustomerId]);

  return (
    <div className="payment-method-selector">
      <h2>Select a Payment Method</h2>
      {paymentMethods.length > 0 ? (
        <div className="payment-methods-container">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method-card ${
                selectedMethodId === method.id ? "selected" : ""
              }`}
              onClick={() => setSelectedMethodId(method.id)}
            >
              <input
                type="radio"
                id={method.id}
                name="paymentMethod"
                value={method.id}
                checked={selectedMethodId === method.id}
                onChange={() => setSelectedMethodId(method.id)}
              />
              <label htmlFor={method.id} className="method-info">
                <span className="brand">{method.card.brand}</span>
                <span className="last4">•••• {method.card.last4}</span>
                <span className="expiry">
                  Expires {method.card.exp_month}/{method.card.exp_year}
                </span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved payment methods found.</p>
      )}
      <button
        className="pay-button"
        onClick={handlePayment}
        disabled={!selectedMethodId || loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default PaymentMethodSelector;
