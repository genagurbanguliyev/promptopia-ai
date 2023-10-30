"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post.id}`);
  };

  const handleDelete = async (id) => {
    console.log(id);
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${id}`, {
          method: "DELETE",
        });
        const filteredPosts = posts.filter((p) => p.id !== id);
        setPosts(filteredPosts);
      } catch (error) {}
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
