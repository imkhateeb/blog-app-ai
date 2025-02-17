"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { User } from "@/types";
import toast from "react-hot-toast";

const ProfilePage = ({ id }: { id: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
        );
        setUser(res.data as User);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    setIsUploading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = (response.data as { url: string }).url;

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
        {
          photo: imageUrl,
          name: user?.name,
          email: user?.email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setUser((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          photo: imageUrl,
        };
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!user) return <p className="text-center text-red-500">User not found</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-sm rounded-lg text-gray-900 dark:text-white"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          {user.photo ? (
            <Image
              src={user.photo}
              alt="Profile"
              layout="fill"
              objectFit="cover"
              className="rounded-full"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full" />
          )}
        </div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>
      <div className="mt-6 flex flex-col items-center gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <div className="flex gap-4">
          <button
            onClick={handleUpload}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isUploading}
          >
            {isUploading ? "Uploading..." : "Upload Profile Photo"}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              localStorage.removeItem("userId");
              router.push("/login");
            }}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-black/90 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
