"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "../app/services/postsService";
import PostCard from "./cards/PostCard";
import CreatePostForm from "./forms/CreatePostForm";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const Forum = ({ currentCommunityUser }) => {
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState(false);
  const [isCreateClicked, setIsCreateClicked] = useState(false);
  // const { isAuth, currentUser } = useAuth();

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const result = await fetchPosts(token);
          setPosts(result.data);
        }
      } catch (error) {
        console.error("Error from fetching posts: ", error)
      }
    };

    fetchAllPosts();
  }, [updatePost]);
  return (
    <div>
      <div className="flex flexCenter bold-32 p-5 text-green-800">
        TeenVent Forum
      </div>

      <div className="mt-5">
        <button
          type="button"
          className="btn_green rounded-3xl mb-5"
          onClick={() => setIsCreateClicked((prev) => !prev)}
        >
          <span className="flex flexCenter gap-3">
            Create a post
            {isCreateClicked ? (
              <IoIosArrowDropup className="text-xl" />
            ) : (
              <IoIosArrowDropdown className="text-xl" />
            )}
          </span>
        </button>
        {isCreateClicked && <CreatePostForm setUpdatePost={setUpdatePost} />}
      </div>

      <p className="bold-18 mt-10">Latest Posts</p>
      <section className="mt-5 flex flex-col gap-10">
        {posts.length === 0 ? (
          <p className="flex justify-center h-lvh">No posts found.</p>
        ) : (
          <>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                content={post.content}
                created_at={post.created_at}
                currentCommunityUser={currentCommunityUser}
                author={post.nickname}
                setUpdatePost={setUpdatePost}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Forum;
