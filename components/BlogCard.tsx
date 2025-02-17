"use client";

import { User } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const BlogCard = ({
  title,
  content,
  author_id,
  created_at,
  updated_at,
  blog_id,
}: {
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  blog_id: number;
}) => {
  const [author, setAuthor] = useState<User | null>(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${author_id}`
      );
      setAuthor(res.data as User);
    };
    fetchAuthor();
  }, [author_id]);

  console.log(author);

  return (
    <Link
      href={"/blogs/" + blog_id}
      className="flex gap-2 shadow-md rounded-lg shadow-gray-200 p-2"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm">{content}</p>
        <p className="text-sm">Author: {author?.name}</p>
        <p>{updated_at}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
