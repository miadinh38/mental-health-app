"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { resetPasswordService } from "../services/authService";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isExpired, setIsExpired] = useState(false);

  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const expires = searchParams.get("expires");

  useEffect(() => {
    if (expires) {
      const now = Math.floor(Date.now() / 1000); // Current time in sec
      if (now > expires) {
        setIsExpired(true);
      }
    }
  }, [expires]);

  useEffect(() => {
    if (isExpired) {
      router.push("/forgot-password");
      toast.error(
        "Your reset password link is expired. Please request a new password reset link."
      );
    }
  }, [isExpired, searchParams]);

  if(!token || !email || !expires) {
      router.push('/forgot-password');
      return;
  }

  const handleSubmit = async(e) => {
    e.preventDefault();    
    
    try {
      if (!newPassword) {
        toast.error("New passowrd is requiqred");
        return;
      }

      if (!confirmPassword || newPassword !== confirmPassword) {
        toast.error("Passwords do not match. Please try again.")
        return;
      }

      const res = await resetPasswordService({token, newPassword});
      if (res.data.errCode === 0) {
        toast.success(res.data.errMessage);
        router.push("/login");
      } else {
        toast.error(res.data.errMessage);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
    }
  }

  return (
    <form className="pt-20 h-dvh" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <p className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Set a new password
            </p>
            <p className="regular-16 leading-tight tracking-tight text-gray-400">
              Create a new password. Ensure it differs from previous ones for
              security{" "}
            </p>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                New Password
                <span className="text-red-500 pl-1">*</span>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                  autoComplete="password"
                />
              </label>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Confirm Password
                <span className="text-red-500 pl-1">*</span>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg block w-full p-2.5"
                  placeholder="••••••••"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="password"
                />
              </label>
            </div>

            <button
              className="w-full bg-green-800 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  focus:ring-blue-800 text-white"
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

export default ResetPassword;