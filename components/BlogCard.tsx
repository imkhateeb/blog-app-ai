"use client";

import { User } from "@/types";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const BlogCard = ({
  title,
  content,
  author_id,
  created_at,
  updated_at,
  blog_id,
  thumbnail,
}: {
  title: string;
  content: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  blog_id: number;
  thumbnail: string;
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

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/blogs/${blog_id}`}
        className="flex gap-4 shadow-md rounded-lg p-4 h-[275px] bg-gray-100 dark:bg-black transition-all max-md:flex-col overflow-hidden"
      >
        <div className="w-[240px] h-[240px] my-auto max-md:w-full relative overflow-hidden rounded-lg">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
          )}
        </div>
        <div className="flex flex-col justify-between w-1/2 max-md:w-full">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {truncateText(title, 50)}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {truncateText(content, 120)}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-300">
            <p className="font-medium">Author: {author?.name || "Unknown"}</p>
            <p className="text-xs">Updated: {updated_at}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
