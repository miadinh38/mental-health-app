"use client";

import { useEffect, useState } from "react";
import { fetchPosts } from "../app/services/postsService";
import PostCard from "./cards/PostCard";
import CreatePostForm from "./forms/CreatePostForm";

const Forum = ({ currentCommunityUser }) => {
  const [posts, setPosts] = useState([]);
  const [updatePost, setUpdatePost] = useState(false)
  // const { isAuth, currentUser } = useAuth();

  useEffect(() => {
    const fetchAllPosts = async () => {
      const result = await fetchPosts();
      console.log("All posts", result.data);
      setPosts(result.data);
    };

    fetchAllPosts();
  }, [updatePost]);
  return (
    <div>
      <div className="flex flexCenter bold-32 p-5 text-green-600">TeenVent Forum</div>
      <CreatePostForm setUpdatePost={setUpdatePost}/>
      <section className="mt-9 flex flex-col gap-10">
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
