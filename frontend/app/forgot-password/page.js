"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgotPasswordService } from "../services/authService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }

      let regx = /\S+@\S+\.\S+/;
      if (!regx.test(email)) {
        toast.error("Please enter a valid email address");
        return;
      }

      const response = await forgotPasswordService({ email });

      if (response.data.errCode === 0) {
        toast.success(response.data.errMessage);
      } else {
        toast.error(response.data.errMessage);
      }
    } catch (error) {
      console.error(
        "Error submitting email in forgor-password:",
        error.message
      );
    }
  };

  return (
    <form className="pt-20 h-dvh" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Forgot Password
            </p>
            <p className="regular-16 leading-tight tracking-tight text-gray-400">
              Please enter your email to reset the password
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
                <span className="text-red-500 pl-1">*</span>
                <input
                  placeholder="JohnDoe@example.com"
                  className="border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5"
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
            </div>

            <button
              className="w-full bg-purple-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
