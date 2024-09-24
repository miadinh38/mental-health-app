"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  let defaultInputCheck = {
    validName: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
  };

  const [checkInputValid, setCheckInputvalid] = useState(defaultInputCheck);

  const isValidInputs = () => {
    setCheckInputvalid(defaultInputCheck);

    if (!name) {
      toast.error("Your name is required!");
      setCheckInputvalid({ ...defaultInputCheck, validName: false });
      console.log("Name check", checkInputValid);
      return false;
    }

    if (!email) {
      toast.error("Email is required!");
      setCheckInputvalid({ ...checkInputValid, validEmail: false });
      console.log("Email check",checkInputValid);
      return false;
    }

    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      setCheckInputvalid({ ...defaultInputCheck, validEmail: false });
      return false;
    }

    if (!password) {
      toast.error("Password is required!");
      setCheckInputvalid({ ...defaultInputCheck, validPassword: false });
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Your passwords do not match");
      setCheckInputvalid({ ...defaultInputCheck, validConfirmPassword: false });
      return false;
    }

    return true;
  };

  const handleRegister = (event) => {
    event.preventDefault();
    let checkValid = isValidInputs();
    let userData = { name, email, password, confirmPassword, phone };
    console.log(`>>Check user data: `, userData);
  };

  return (
    <form className="pt-20 h-dvh" onSubmit={handleRegister}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
                <input
                  placeholder="John Doe"
                  className={`${checkInputValid.validName ? 'border-gray-300': 'border-red-500'} 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Email
                <input
                  placeholder="JohnDoe@example.com"
                  className={`${checkInputValid.validEmail ? 'border-gray-300': 'border-red-500'} 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Password
                <input
                  className={`${checkInputValid.validPassword ? 'border-gray-300': 'border-red-500'} 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  placeholder="••••••••"
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
                <input
                  className={`${checkInputValid.validConfirmPassword ? 'border-gray-300': 'border-red-500'} 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  placeholder="••••••••"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Phone Number
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="(+1) 000-000-000"
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="phone"
                />
              </label>
            </div>

            <button
              className="w-full bg-green-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              type="submit"
            >
              Create an account
            </button>

            <p className="regular-14">
              Already had an account?
              <Link href="/login" className="pl-2 bold-16 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Register;
