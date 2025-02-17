// components/AddBlog.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [generating, setGenerating] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Title, Content, and Author are required");
      return;
    }

    setSubmitting(true);
    const author_id = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    console.log(author_id, accessToken);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`,
        {
          title,
          content,
          author_id,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setTitle("");
      setContent("");
      toast.success("Blog Post Created!");
      router.push("/blogs");
    } catch (err: unknown) {
      console.log(err);
      setError("Failed to create blog post");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    if (!title) {
      toast.error("Title is required");
      return;
    }
    setGenerating(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/generate`,
        { title }
      );
      console.log(response);
      toast.success("Blog post generated successfully");
      setContent(response.data as string);
    } catch (err: unknown) {
      console.log(err);
      toast.error("Failed to generate blog post");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm flex flex-col min-h-[90vh] justify-center w-full">
      <h2 className="text-2xl font-semibold mb-4">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          disabled={generating}
          type="button"
          className="py-2 w-full rounded-lg bg-black text-white"
          onClick={handleGenerate}
        >
          {generating ? "Generating..." : "Generate Blog"}
        </button>
        <button
          type="submit"
          className="py-2 w-full rounded-lg bg-black text-white"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Create Post"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AddBlog;
