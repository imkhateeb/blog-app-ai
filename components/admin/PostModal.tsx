"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Post } from "@/types";

const PostModal = ({
  onClose,
  post,
  refreshPosts,
  isOpen,
}: {
  post: Post | null;
  onClose: () => void;
  refreshPosts: () => void;
  isOpen: boolean;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setThumbnail(post.thumbnail);
    } else {
      setTitle("");
      setContent("");
      setThumbnail("");
    }
  }, [post]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const postData = { title, content, thumbnail };
      if (post) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}`,
          postData
        );
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/posts`, postData);
      }
      refreshPosts();
      onClose();
    } catch (error) {
      console.error("Error saving post", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {post ? "Edit Post" : "Add Post"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="Thumbnail URL"
          />
          <button type="submit">Save</button>
        </form>
      </motion.div>
    </div>
  );
};

export default PostModal;
