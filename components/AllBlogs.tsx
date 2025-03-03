// pages/blogs/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Post } from "@/types";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/posts`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setBlogs(res.data as Post[]);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  console.log(blogs);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between">
        <div className="flex items-end gap-2">
          <h1 className="text-2xl font-bold">All Blogs</h1>
          <p className="text-sm text-gray-500">{blogs.length} blogs found</p>
        </div>
        <Link
          href="/blogs/add"
          className="py-1.5 px-4 rounded-full bg-black text-white active:scale-95 transition-all"
        >
          Create Blog
        </Link>
      </div>
      <div>
        <input
          className="py-1.5 px-2 rounded-lg focus:ring-2 ring-black outline-none border-[2px] border-gray-300 text-md w-[300px]"
          placeholder="Search your blog..."
        />
      </div>
      <ul className="flex flex-col gap-4">
        {blogs?.map(
          (blog: {
            id: number;
            title: string;
            content: string;
            author_id: number;
            created_at: string;
            updated_at: string;
            thumbnail: string;
          }) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              content={blog.content}
              author_id={blog.author_id}
              created_at={blog.created_at}
              updated_at={blog.updated_at}
              blog_id={blog.id}
              thumbnail={blog.thumbnail}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default AllBlogs;
