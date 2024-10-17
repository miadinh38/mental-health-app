"use client";
import { useState } from "react";
import Guideline from "./Guideline";
import NicknameForm from "./forms/NicknameForm";
import { createCommunityUser } from "../app/services/communityUserService";
import { toast } from "react-toastify";

const CheckinCommunity = ({ onPrevious, next, setHasJoined }) => {
  const [nickname, setNickname] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleNicknameSubmit = (data) => {
    setNickname(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isChecked && nickname.trim() !== "" && typeof window !== "undefined") {
      try {
        const token = localStorage.getItem("token");
        const response = await createCommunityUser({ token, nickname });
        if (response.data.errCode === 0) {
          toast.success(response.data.errMessage)
          setHasJoined(true)
        } else {
          toast.error(response.data.errMessage)
        }
      } catch (error) {
        console.error("Error creating community user:", error);
      }
    } else {
      setNickname("");
    }
  };

  return (
    <div>
      {next && (
        <form onSubmit={handleSubmit}>
          <NicknameForm onSubmit={handleNicknameSubmit} />
          <Guideline
            isChecked={isChecked}
            onCheckboxChange={handleCheckboxChange}
          />
          <div className="flex gap-4 mt-5">
            <button
              type="button"
              className="btn_green rounded-xl"
              onClick={onPrevious}
            >
              Go Back
            </button>
            <button
              type="submit"
              className={`px-5 py-3 text-white rounded-xl ${
                isChecked && nickname
                  ? "btn_green"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isChecked || !nickname}
            >
              Join Now
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckinCommunity;
