"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUserService } from "../services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const Register = () => {
  const router = useRouter();
  const { checkAuthentication } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthday: "",
    gender: "",
  });

  const defaultInputCheck = {
    validName: true,
    validEmail: true,
    validPassword: true,
    validConfirmPassword: true,
    validBirthday: true,
    validPhone: true,
  };

  const [checkInputValid, setCheckInputValid] = useState(defaultInputCheck);

  // Check inputs validation
  const isValidInputs = () => {
    setCheckInputValid(defaultInputCheck);
    const { name, email, password, confirmPassword, birthday, phone } =
      formData;

    if (!name) {
      toast.error("Your name is required!");
      setCheckInputValid({ ...defaultInputCheck, validName: false });
      // console.log("Name check", checkInputValid);
      return false;
    }

    if (!email) {
      toast.error("Email is required!");
      setCheckInputValid({ ...defaultInputCheck, validEmail: false });
      // console.log("Email check", checkInputValid);
      return false;
    }

    // Regular expression to validate email format
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
    if (selectedDay > today) {
      toast.error("Birthday is not valid");
      setCheckInputValid({ ...defaultInputCheck, validBirthday: false });
      return false;
    }

    // Regular expression to validate phone number
    const phoneRegex = /^\+?\d{1,15}$/;
    if (typeof phone !== "string" || !phoneRegex.test(phone)) {
      toast.error("Invalid phone number format");
      setCheckInputValid({ ...defaultInputCheck, validPhone: false });
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
      case "birthday":
        return "validBirthday";
      case "phone":
        return "validPhone";
      default:
        return fieldName;
    }
  };

  const handleRegister = async (event) => {
    const { name, email, password, birthday, phone, gender } = formData;
    event.preventDefault();
    let checkValid = isValidInputs();

    if (checkValid) {
      const res = await registerUserService({
        name,
        email,
        password,
        birthday,
        phone,
        gender,
      });
      const data = res.data;
      // console.log(`>>Check user data: `, res.data);

      if (data.errCode === 0) {
        toast.success(data.errMessage);
        // Check if window is defined before accessing localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }
        checkAuthentication(data.token);
        router.push("/");
      } else {
        toast.error(data.errMessage);
        setCheckInputValid({ ...defaultInputCheck, validEmail: false });
      }
    }
  };

  return (
    <form className="pt-20" onSubmit={handleRegister}>
      <div className="flex flex-col items-center justify-center mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow-xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Full Name
                <span className="text-red-500 pl-1">*</span>
                <input
                  placeholder="John Doe"
                  className={`${
                    checkInputValid.validName
                      ? "border-gray-300"
                      : "border-red-500"
                  } 
                  border border-gray-300 text-gray-900
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
                  border border-gray-300 text-gray-900
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
                  border border-gray-300 text-gray-900
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
                  border border-gray-300 text-gray-900
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
                    className="border border-gray-300 sm:text-sm rounded-lg block w-full p-2.5 text-gray-900"
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
                    className={`${
                      checkInputValid.validBirthday
                        ? "border-gray-300"
                        : "border-red-500"
                    } 
                    border border-gray-300 text-gray-900
                    sm:text-sm rounded-lg block w-full p-2.5`}
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
                  className={`${
                    checkInputValid.validPhone
                      ? "border-gray-300"
                      : "border-red-500"
                  } 
                  border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5`}
                  placeholder="+1 000000000"
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
              className="w-full bg-purple-700 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
              type="submit"
            >
              Create an account
            </button>

            <p className="regular-14">
              Already had an account?
              <Link
                href="/login"
                className="pl-2 text-purple-700 hover:underline"
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
