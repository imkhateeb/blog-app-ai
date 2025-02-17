"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User } from "@/types";
import toast from "react-hot-toast";

const UserModal = ({
  onClose,
  user,
  refreshUsers,
  isOpen,
}: {
  user: User | null;
  onClose: () => void;
  refreshUsers: () => void;
  isOpen: boolean;
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("user");
  const [file, setFile] = useState<File | null>(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoto(user.photo);
      setRole(user.role || "user");
    } else {
      setName("");
      setEmail("");
      setPhoto("");
      setRole("user");
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAdding(true);
    try {
      let uploadedPhoto = photo;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/upload`,
          formData
        );
        uploadedPhoto = (res.data as { url: string }).url;
      }

      if (user) {
        await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}`, {
          name,
          email,
          photo: uploadedPhoto,
          role,
        });
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/users/auth/register`,
          {
            name,
            email,
            photo: uploadedPhoto,
            role,
            password: "12345678",
          }
        );
      }

      toast.success("User saved successfully");

      refreshUsers();
      onClose();
    } catch (error) {
      console.error("Error saving user", error);
    } finally {
      setAdding(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
          {user ? "Edit User" : "Add User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
            required
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg active:scale-95 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg active:scale-95 transition-all duration-200"
              disabled={adding}
            >
              {adding ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UserModal;
