import React from "react";
import { useForm } from "react-hook-form";
import { createNewPost } from "../../app/services/postsService";
import Link from "next/link";
import { motion } from 'framer-motion';

const CreatePostForm = ({ setUpdatePost }) => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      try {
        await createNewPost(token, data);
        setUpdatePost((prev) => !prev);
        reset();
        
      } catch (error) {
        console.error("Error from creating new post: ", error)
      }
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 border border-gray-300 rounded-md shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <label className="block mb-1" />
        <textarea
          className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
          rows="4"
          placeholder="How do you feel today?"
          {...register("content", { required: true })}
        />
      </div>

      <div className="flex flex-col mb-5 gap-3">
        <p className="regular-12 text-gray-30">
          <strong>Visibility:</strong> Your post will be visible to all TeenVent
          Community users. Please ensure that all posts comply with community
          guidelines; otherwise, they may be removed by admins.{" "}
        </p>
        <p className="regular-12 text-gray-30">
          <strong>Be mindful:</strong> Please avoid posting any topics related
          to self-harm, suicide, trauma, or substance use, as this forum is not
          equipped to appropriately address these issues. If you are in a
          crisis, please contact our admin, seek a therapist for support, or
          visit{" "}
          <Link
            href="/get-help-now"
            className="underline cursor-pointer hover:font-bold"
          >
            Get Help Now
          </Link>{" "}
          for emergency assistance. Your safety is our priority.{" "}
        </p>
      </div>

      <button type="submit" className="btn_green rounded-md">
        Share
      </button>
    </motion.form>
  );
};

export default CreatePostForm;
