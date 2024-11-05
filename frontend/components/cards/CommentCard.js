import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "../../app/utils/formatDate";
import Image from "next/image";
import MoreOptionsDropdown from "../MoreOptionsDropdown";
import {
  deleteComment,
  updateComment,
} from "../../app/services/commentsService";
import ConfirmationModal from "../ConfirmationModal";

const CommentCard = ({
  postId,
  comment,
  authorComment,
  commentId,
  created_at,
  currentCommunityUser,
  setUpdateComment,
}) => {
  const { timeAgo } = formatDate(created_at);
  const [isMore, setIsMore] = useState(false);
  const dropdownRef = useRef(null);
  const [editContent, setEditContent] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedId, setSelectedId] = useState(null);
  const [comments, setComments] = useState([]);

  const handleEditComment = async () => {
    setIsEditing(commentId);
    setIsMore(false);
    setEditContent(comment);
  };

  const handleSaveChanges = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        const res = await updateComment(
          token,
          { content: editContent },
          postId,
          commentId
        );
        setUpdateComment((prev) => !prev);
        setIsEditing(null);
      } catch (error) {
        console.error("Error from editing comment: ", error);
      }
    }
  };

  const handleDeleteComment = async () => {
    setIsModalOpen(true);
    setIsMore(false);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onConfirmModal = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        await deleteComment(token, postId, commentId);
        setUpdateComment((prev) => !prev);
      } catch (error) {
        console.error("Error from deleting comment: ", error);
      }
    }
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

  return (
    <motion.article
      className="flex flex-col mx-10 mt-5"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-row gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/img1.png"
              alt="user profile"
              width={30}
              height={30}
              className="rounded-full"
            />
            <div className="post-card_bar" />
          </div>

          <div className="flex flex-col rounded-3xl py-3 px-6 border border-gray-10 hover:shadow-sm cursor-pointer flex-1">
            <div className="flex flexStart">
              <p className="font-semibold text-purple-700 capitalize">
                {authorComment}
              </p>
              <span className="regular-12 text-gray-30 ml-2">• {timeAgo}</span>
            </div>

            {isEditing === commentId ? (
              <div className="flex gap-4">
                <textarea
                  type="text"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows="1"
                  className="border border-gray-300 rounded-md p-2 w-full focus:outline-none mt-2"
                />
                <button
                  onClick={handleSaveChanges}
                  className="btn_purple w-20 rounded-xl mt-3"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className="whitespace-pre-wrap mt-2 regular-14">{comment}</p>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <MoreOptionsDropdown
              currentCommunityUser={currentCommunityUser}
              author={authorComment}
              isMore={isMore}
              handleMore={handleMore}
              handleEdit={handleEditComment}
              handleDelete={handleDeleteComment}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        onConfirmModal={onConfirmModal}
      />
    </motion.article>
  );
};

export default CommentCard;
