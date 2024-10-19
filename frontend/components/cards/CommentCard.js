import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDate } from "../../app/utils/formatDate";
import Image from "next/image";

const CommentCard = ({
  postId,
  comment,
  authorComment,
  commentId,
  created_at,
}) => {
  const { timeAgo } = formatDate(created_at);
  const [selectedId, setSelectedId] = useState(null);
  const [comments, setComments] = useState([]);

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

          <div className="flex flex-col rounded-3xl p-3 border border-gray-10 flex-1">
            <div className="flex flexStart">
              <p className="font-semibold text-green-800 capitalize">
                {authorComment}
              </p>
              <span className="regular-12 text-gray-30 ml-2">• {timeAgo}</span>
            </div>
            <p className="whitespace-pre-wrap mt-2 regular-14">{comment}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default CommentCard;

{
  /* {isEditing === id ? (
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
            ) : ( */
}
{
  /* <p className="whitespace-pre-wrap mt-2 regular-14">{comment}</p> */
}
{
  /* )} */
}

{
  /* <div className="relative" ref={dropdownRef}>
            <MdMoreHoriz
              className={`regular-20 cursor-pointer ${
                currentCommunityUser === author ? "" : "opacity-0"
              }`}
              onClick={currentCommunityUser === author ? handleMore : null}
            />
            {isMore && currentCommunityUser === author && (
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
          </div> */
}
