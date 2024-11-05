"use client";

import { useEffect, useState } from "react";
import CheckinCommunity from "../../components/CheckinCommunity";
import Forum from "../../components/Forum";
import { useAuth } from "../../hooks/useAuth";
import CommunityInfo from "../../components/CommunityInfo";
import Link from "next/link";
import Button from "../../components/Button";
import { checkUserHasJoined } from "../services/communityUserService";

const Community = () => {
  const { isAuth } = useAuth();
  const [next, setNext] = useState(false);
  const [hasJoined, setHasJoined] = useState(false);
  const [currentCommunityUser, setCurrentCommunityUser] = useState("");

  const handleNextButton = () => {
    setNext(true);
  };
  const handlePreviousButton = () => {
    setNext(false);
  };

  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const response = await checkUserHasJoined(token);
          setHasJoined(response.data.has_joined);
          setCurrentCommunityUser(response.data.communityUser[0].nickname);
        }
      } catch (err) {
        console.error("Error checking user status:", err);
      }
    };

    fetchUserStatus();
  }, []);

  return (
    <div className="padding-container max-container">
      {!isAuth && (
        <div className="p-4 rounded shadow-md">
          <p className="flexCenter bold-32 p-5 text-purple-700">
            Join the TeenVent Community
          </p>
          <CommunityInfo />

          <ul className="flex gap-3">
            {["login", "register"].map((button, index) => (
              <Link key={index} href={`/${button}`}>
                <Button
                  type="button"
                  title={button}
                  variant="btn_purple capitalize"
                />
              </Link>
            ))}
          </ul>
        </div>
      )}

      {isAuth && !hasJoined && (
        <div className="p-4 rounded shadow-md">
          <p className="flexCenter bold-32 p-5 text-purple-700">
            Join the TeenVent Community
          </p>

          {!next ? (
            <div>
              <CommunityInfo />

              <button
                type="button"
                className="btn_purple rounded-xl"
                onClick={handleNextButton}
              >
                Next
              </button>
            </div>
          ) : (
            <CheckinCommunity
              onPrevious={handlePreviousButton}
              next={setNext}
              setHasJoined={setHasJoined}
            />
          )}
        </div>
      )}

      {isAuth && hasJoined && (
        <Forum currentCommunityUser={currentCommunityUser} />
      )}
    </div>
  );
};

export default Community;
