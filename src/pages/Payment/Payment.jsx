// Payment.jsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutFrom";
import SharedTitle from "../../Shared/SharedTitle/SharedTitle";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div className="container mx-auto p-6">
      <SharedTitle
        subHeading="Complete Payment"
        heading="Payment Information"
      />
      <div className="mt-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;