"use client";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";
import { createNewComment } from "../../app/services/commentsService";

const CreateCommentForm = ({ postId, setUpdateComment }) => {
  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const onCommentSubmit = async(data) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        await createNewComment(token, data, postId)
        setUpdateComment((prev) => !prev)
        reset()
      } catch (error) {
        console.error("Error from creating new comment: ", error)       
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onCommentSubmit)}
      className="flex flex-1 gap-4 mt-4"
    >
      <textarea
        className="border border-gray-10 rounded-3xl p-1 focus:outline-none w-full regular-14"
        placeholder="  Type your comment..."
        {...register("content", {
          required: true,
        })}
        rows="1"
      />

      <button tyoe="submit" className="btn_green rounded-md">
        <IoSend className="text-xs" />
      </button>
    </form>
  );
};

export default CreateCommentForm;
