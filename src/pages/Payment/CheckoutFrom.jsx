// CheckoutForm.jsx
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const CheckoutForm = () => {
  const axiosPublic = useAxiosPublic()
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { createUser, updateUserProfile } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const formData = JSON.parse(sessionStorage.getItem("hrFormData"));
    if (!formData) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Form data not found. Please fill the form first.",
      });
      return;
    }

    try {
      const cardElement = elements.getElement(CardElement);
      const { token, error } = await stripe.createToken(cardElement);

      if (error) {
        throw new Error(error.message);
      }
      await createUser(formData.email, formData.password);
      await updateUserProfile(formData.fullName, formData.photoURL);

      const packageDetails = {
        type:
          formData.package === "basic"
            ? "5 Members"
            : formData.package === "standard"
            ? "10 Members"
            : "20 Members",
        price:
          formData.package === "basic"
            ? 5
            : formData.package === "standard"
            ? 8
            : 15,
        limit:
          formData.package === "basic"
            ? 5
            : formData.package === "standard"
            ? 10
            : 20,
        currentEmployees: 0,
      };

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        dateOfBirth: formData.dob,
        company: {
          name: formData.companyName,
          logo: formData.photoURL,
        },
        package: packageDetails,
        role: "hr",
        profilePicture: formData.photoURL,
        team: [],
        paymentId: token.id,
      };

      const response = await axiosPublic.post("/hrManager", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to save user data");
      }
      sessionStorage.removeItem("hrFormData");

      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Payment successful and account created!",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message || "Something went wrong",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <div className="p-4 border rounded-md bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 mt-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutForm;
