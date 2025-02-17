// pages/blogs/index.tsx
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
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
        setBlogs(res.data);
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
    <div>
      <h1>All Blogs</h1>
      <ul>
        {blogs?.map((blog: { id: string; title: string }) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllBlogs;
