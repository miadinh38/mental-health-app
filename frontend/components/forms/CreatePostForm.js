import React from 'react';
import { useForm } from 'react-hook-form';
import { createNewPost } from '../../app/services/postsService';

const CreatePostForm = ({ setUpdatePost }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    console.log('Post Data:', data);

    if (typeof window!== "undefined") {
      const token = localStorage.getItem('token')
      const res = await createNewPost(token, data)
      console.log("create post: ", res.data)
      setUpdatePost((prev) => !prev)
      reset();
    }
  };

  return (
    <div className="create-post-container p-4 border border-gray-300 rounded-md shadow-md">      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block mb-1"/>
          <textarea
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none"
            rows="4"
            placeholder="How do you feel today?"
            {...register('content', { required: 'Content is required' })}
          />
          {errors.content && <p className="text-red-500">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          className="btn_green rounded-md"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
