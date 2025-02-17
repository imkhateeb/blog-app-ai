"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import axios from "axios";

const BlogDetails = ({ id }: { id: string }) => {
  // Update params type
  const [blog, setBlog] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log(res.data);
        setBlog(res.data as Post);
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
    <div className="flex flex-col gap-2 p-2 sm:p-4">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
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
