import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRegComment, FaRegHeart, FaHeart } from "react-icons/fa";
import { PiShareFat } from "react-icons/pi";
import { deletePost, updatePost } from "../../app/services/postsService";
import CreateCommentForm from "../forms/CreateCommentForm";
import CommentCard from "./CommentCard";
import { fetchComments } from "../../app/services/commentsService";
import { formatDate } from "../../app/utils/formatDate";
import MoreOptionsDropdown from "../MoreOptionsDropdown";
import ConfirmationModal from "../ConfirmationModal";

const PostCard = ({
  id,
  content,
  created_at,
  currentCommunityUser,
  setUpdatePost,
  author,
}) => {
  const { formattedDate, formattedTime, timeAgo } = formatDate(created_at);
  const [isLiked, setIsLiked] = useState(false);
  const [isMore, setIsMore] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [comments, setComments] = useState([]);
  const [updateComment, setUpdateComment] = useState(false);
  const [isCommentCliked, setIsCommentClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dropdownRef = useRef(null);

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
        await deletePost(token, id);
        setUpdatePost((prev) => !prev);
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  // Fetching all comments function
  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");

          const result = await fetchComments(token, id);
          // console.log("All Comments", result.data);
          setComments(result.data);
        }
      } catch (error) {
        console.error("Error from fetching comments: ", error);
      }
    };

    fetchAllComments();
  }, [updateComment, id]);

  return (
    <motion.article
      className="flex w-full flex-col rounded-xl bg-green-5 bg-opacity-30 p-7 shadow-md"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.005, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
    >
      <div className="flex flex-col items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Image
              src="/img1.png"
              alt="user profile"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="post-card_bar" />
          </div>

          <div className="flex w-full flex-col">
            <div className="flex flexStart">
              <p className="font-semibold text-purple-700 capitalize">
                {author}
              </p>
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
                  className="btn_purple w-20 rounded-xl mt-3"
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
                <FaRegComment
                  className="regular-18 cursor-pointer"
                  onClick={() => setIsCommentClicked((prev) => !prev)}
                />
                <PiShareFat className="regular-20 cursor-pointer" />
              </div>
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <MoreOptionsDropdown
              currentCommunityUser={currentCommunityUser}
              author={author}
              isMore={isMore}
              handleMore={handleMore}
              handleEdit={handleEditPost}
              handleDelete={handleDeletePost}
            />
          </div>
        </div>

        <div className="flex flex-col mt-5 justify-between">
          {/* <p className="regular-12 text-gray-30">5 Likes • 10 Comments</p> */}
          <p className="regular-12 text-gray-30">
            {formattedDate} • {formattedTime}
          </p>
        </div>
      </div>

      {isCommentCliked && (
        <div className="mt-2">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              postId={id}
              commentId={comment.id}
              comment={comment.content}
              authorComment={comment.nickname}
              created_at={comment.created_at}
              dropdownRef={dropdownRef}
              currentCommunityUser={currentCommunityUser}
              setUpdateComment={setUpdateComment}
            />
          ))}
          <CreateCommentForm postId={id} setUpdateComment={setUpdateComment} />
        </div>
      )}

      <ConfirmationModal
        isModalOpen={isModalOpen}
        onCloseModal={onCloseModal}
        onConfirmModal={onConfirmModal}
      />
    </motion.article>
  );
};

export default PostCard;
