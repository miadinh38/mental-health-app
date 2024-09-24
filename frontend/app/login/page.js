"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const defaultInputCheck = {
    validEmail: true,
    validPassword: true,
  };

  const [checkInputValid, setCheckInputValid] = useState(defaultInputCheck);

  const isValidInputs = () => {
    const { email, password } = formData;
    if (!email) {
      toast.error("Email is required");
      setCheckInputValid({ ...defaultInputCheck, validEmail: false });
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      setCheckInputValid({ ...defaultInputCheck, validEmail: false });
      return false;
    }

    if (!password) {
      toast.error("Password is required");
      setCheckInputValid({ ...defaultInputCheck, validPassword: false });
      return false;
    }

    return true;
  };

  const handleChangeInput = (e) => {
    setCheckInputValid(defaultInputCheck);
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let checkInputValid = isValidInputs();
    console.log("Login successfully!", formData);
  };

  return (
    <form className="pt-20 h-dvh" onSubmit={handleLogin}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Welcome back
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
                <span className="text-red-500 pl-1">*</span>
                <input
                  placeholder="JohnDoe@example.com"
                  className={`${
                    checkInputValid.validEmail
                      ? "border-gray-300"
                      : "border-red-500"
                  } 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChangeInput}
                  autoComplete="email"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
                <span className="text-red-500 pl-1">*</span>
                <input
                  className={`${
                    checkInputValid.validEmail
                      ? "border-gray-300"
                      : "border-red-500"
                  } 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  placeholder="••••••••"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChangeInput}
                  autoComplete="password"
                />
              </label>
            </div>

            <button
              className="w-full bg-green-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              type="submit"
            >
              Login
            </button>

            <p className="regular-14">
              Don't have an account yet?
              <Link
                href="/register"
                className="pl-2 text-green-800 hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Login;
