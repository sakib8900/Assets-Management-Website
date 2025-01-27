import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { token, error } = await stripe.createToken(cardElement);
    if (error) {
      console.log(error.message);
    } else {
      console.log("Received Stripe token:", token);

      // Save payment status for session tracking
      sessionStorage.setItem("paymentDone", "true");

      // Redirect after successful payment
      navigate("/hrForm");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded mt-4"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
}

export default CheckoutForm;
