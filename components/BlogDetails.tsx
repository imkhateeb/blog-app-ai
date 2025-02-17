"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/types";
import axios from "axios";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

const BlogDetails = ({ id }: { id: string }) => {
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
        setBlog(res.data as Post);
      } catch (error) {
        console.error("Failed to fetch blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">Loading...</p>
    );
  if (!blog)
    return (
      <p className="text-center text-red-500 font-medium">Blog not found</p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden"
    >
      {blog.thumbnail && (
        <div className="relative w-full h-64">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      )}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {blog.title}
        </h1>
        <ReactMarkdown className="prose prose-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {blog.content}
        </ReactMarkdown>
        <div className="mt-6 flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>Author ID:</strong> {blog.author_id}
          </p>
          <p>
            <strong>Published:</strong> {blog.published ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetails;
