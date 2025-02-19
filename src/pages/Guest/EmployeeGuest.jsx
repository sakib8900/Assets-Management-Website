import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import loginLottie from "../../assets/lootie/login.json";
import { app } from "../../firebase/firebase.config";

const HrGuest = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGuestLogin = async () => {
    setIsLoading(true);
    const email = "power1@gmail.com";
    const password = "Password@1";

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      if (result.user) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Logged in as Employee Guest",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/", { replace: true });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials! Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero min-h-screen">
      <Helmet>
        <title>Asset Management || Employee Guest Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse gap-10">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <Lottie animationData={loginLottie} loop={true} style={{ height: "300px", width: "300px" }} />
        </div>

        {/* Login Form */}
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h2 className="text-xl font-bold text-center">Employee Guest Login</h2>

            <div className="form-control mt-6">
              <button
                onClick={handleGuestLogin}
                className={`items-center px-6 py-2 backdrop-blur-md text-blue-500 text-lg font-semibold rounded-lg 
                                             shadow-lg hover:bg-blue-500 hover:text-black border-2 border-blue-500 
                                             transition-all duration-300 hover:shadow-blue-500/50 
                                             active:scale-95 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login as Employee Guest"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HrGuest;
