"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthday: "",
    gender: "",
  });

  let defaultInputCheck = {
    validName: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
  };

  const [checkInputValid, setCheckInputValid] = useState(defaultInputCheck);

  // Check inputs validation
  const isValidInputs = () => {
    setCheckInputValid(defaultInputCheck);
    const { name, email, password, confirmPassword, birthday } = formData;

    if (!name) {
      toast.error("Your name is required!");
      setCheckInputValid({ ...defaultInputCheck, validName: false });
      console.log("Name check", checkInputValid);
      return false;
    }

    if (!email) {
      toast.error("Email is required!");
      setCheckInputValid({ ...defaultInputCheck, validEmail: false });
      console.log("Email check", checkInputValid);
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

    if (password !== confirmPassword) {
      toast.error("Your passwords do not match");
      setCheckInputValid({ ...defaultInputCheck, validConfirmPassword: false });
      return false;
    }

    const today = new Date();
    const selectedDay = new Date(birthday);
    if(selectedDay > today) {
      toast.error("Birthday is not valid");
      return false;
    }

    return true;
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Reset validity state for the specific input field when the user types
    resetValidity(name);
  };

  const resetValidity = (fieldName) => {
    setCheckInputValid((prev) => ({
      ...prev,
      [getValidityKey(fieldName)]: true, // Reset the validity for the specific field
    }));
  };

  const getValidityKey = (fieldName) => {
    switch (fieldName) {
      case "name":
        return "validName";
      case "email":
        return "validEmail";
      case "password":
        return "validPassword";
      case "confirmPassword":
        return "validConfirmPassword";
      case "phone":
        return "validPhone";
      default:
        return fieldName;
    }
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const { name, email, password, confirmPassword, birthday, gender, phone } =
      formData;

    let checkValid = isValidInputs();
    let userData = {
      name,
      email,
      password,
      confirmPassword,
      birthday,
      gender,
      phone,
    };
    console.log(`>>Check user data: `, userData);
  };

  return (
    <form className="pt-20" onSubmit={handleRegister}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Your Name
                <span className="text-red-500 pl-1">*</span>
                <input
                  placeholder="John Doe"
                  className={`${
                    checkInputValid.validName
                      ? "border-gray-300"
                      : "border-red-500"
                  } 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChangeInput}
                  autoComplete="name"
                />
              </label>
            </div>

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
                    checkInputValid.validPassword
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
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
                <span className="text-red-500 pl-1">*</span>
                <input
                  className={`${
                    checkInputValid.validConfirmPassword
                      ? "border-gray-300"
                      : "border-red-500"
                  } 
                  bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  placeholder="••••••••"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChangeInput}
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div className="flex justify-between">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChangeInput}
                    className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 bg-gray-50 text-gray-900"
                  >
                    <option valaue="">Please select one...</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non-binary">Non-Binary</option>
                    <option value="other">Other</option>
                    <option value="prefer not to say">Prefer not to say</option>
                  </select>
                </label>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Birthday
                  <input
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                    id="birthday"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleChangeInput}
                    autoComplete="birthday"
                  />
                </label>
              </div>
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
                  value={formData.phone}
                  onChange={handleChangeInput}
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
              <Link
                href="/login"
                className="pl-2 text-green-800 hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Register;
