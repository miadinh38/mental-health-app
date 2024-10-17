import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { motion } from 'framer-motion';
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { CiEdit, CiTrash } from "react-icons/ci";
import { MdMoreHoriz } from "react-icons/md";
import { deletePost, updatePost } from "../../app/services/postsService";

const PostCard = ({
  key,
  id,
  content,
  created_at,
  currentCommunityUser,
  setUpdatePost,
  author,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const dropdownRef = useRef(null);

  const postDate = new Date(created_at);

  // Format the date
  const formattedDate = postDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Format the time
  const formattedTime = postDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // Calculate time ago
  const currentTime = new Date();
  const differenceInMs = currentTime - postDate;
  const differenceInMinutes = Math.floor(differenceInMs / 1000 / 60);
  let timeAgo;

  if (differenceInMinutes < 1) {
    timeAgo = "Just now";
  } else if (differenceInMinutes === 1) {
    timeAgo = "1 min ago";
  } else if (differenceInMinutes < 60) {
    timeAgo = `${differenceInMinutes} mins ago`;
  } else {
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    if (differenceInHours === 1) {
      timeAgo = "1 hour ago";
    } else if (differenceInHours < 24) {
      timeAgo = `${differenceInHours} hours ago`;
    } else {
      const differenceInDays = Math.floor(differenceInHours / 24);
      if (differenceInDays === 1) {
        timeAgo = "1 day ago";
      } else {
        timeAgo = `${differenceInDays} days ago`;
      }
    }
  }

  const handleToggle = () => {
    setIsLiked((prev) => !prev);
  };

  const handleMore = () => {
    setIsMore((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMore(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditPost = () => {
    setIsMore(false);
    setIsEditing(id);
    setEditContent(content);
  };

  const handleSaveChanges = async () => {
    console.log("saved");
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

      try {
        await updatePost(token, { content: editContent }, id);
        setUpdatePost((prev) => !prev);
        setIsEditing(null);
      } catch (error) {
        console.error("Error editing post:", error);
      }
    }
  };

  const handleDeletePost = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        await deletePost(token, id);
        setIsMore(false);
        setUpdatePost((prev) => !prev);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <motion.article 
      className="flex w-full flex-col rounded-xl bg-pink-5 bg-opacity-80 p-7 shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{duration: 0.5 }}
      whileHover={{ scale: 1.005, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
    >
      <div className-="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/img2.webp"
              alt="user profile"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="post-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flexStart">
            <p className="font-semibold text-green-800 capitalize">{author}</p>
            <span className="regular-12 text-gray-30 ml-2">• {timeAgo}</span>
            </div>

            {isEditing === id ? (
              <>
                <textarea
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none mt-2"
                  rows="4"
                />
                <button
                  onClick={handleSaveChanges}
                  className="btn_green w-20 rounded-xl mt-3"
                >
                  Save
                </button>
              </>
            ) : (
              <p className="whitespace-pre-wrap mt-2 regular-14">{content}</p>
            )}

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-5">
                <div onClick={handleToggle} className="cursor-pointer">
                  {isLiked ? (
                    <FaHeart className="regular-18 text-red-500" />
                  ) : (
                    <FaRegHeart className="regular-18" />
                  )}
                </div>
                <FaRegComment className="regular-18 cursor-pointer" />
                <PiShareFat className="regular-20 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <MdMoreHoriz
              className="regular-20 cursor-pointer"
              onClick={handleMore}
            />
            {isMore && (
              <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-100 rounded shadow-lg z-10">
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer regular-12"
                  onClick={handleEditPost}
                >
                  <CiEdit className="mr-2" /> Edit Post
                </div>
                <div
                  className="flex items-center p-2 hover:bg-gray-100 cursor-pointer regular-12"
                  onClick={handleDeletePost}
                >
                  <CiTrash className="mr-2" /> Delete Post
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col mt-5">
          <p className="regular-12 text-gray-30">5 Likes • 10 Comments</p>
          <p className="regular-12 text-gray-30">{formattedDate} • {formattedTime}</p>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
