"use client";

// pages/blogs/[id].tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Post } from "@/types";

const BlogDetails = () => {
  const [blog, setBlog] = (useState < Post) | (null > null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return; // Wait until the id is available

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>
        <strong>Author ID:</strong> {blog.author_id}
      </p>
      <p>
        <strong>Published:</strong> {blog.published ? "Yes" : "No"}
      </p>
    </div>
  );
};

export default BlogDetails;
