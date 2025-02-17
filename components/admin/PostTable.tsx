"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "@/types";
import PostModal from "./PostModal";

const PostTable = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, posts]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setPosts(res.data as Post[]);
      setFilteredPosts(res.data as Post[]);
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleSearch = () => {
    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleSort = (field: keyof Post) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);

    const sorted = [...filteredPosts].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredPosts(sorted);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };

  const handleEdit = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleAddPost = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Posts</h2>
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search by title..."
          className="border p-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleAddPost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Post
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("title")}
            >
              Title
            </th>
            <th className="border p-2">Content</th>
            <th
              className="border p-2 cursor-pointer"
              onClick={() => handleSort("created_at")}
            >
              Created At
            </th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.content.substring(0, 50)}...</td>
              <td className="border p-2">
                {new Date(post.created_at).toLocaleDateString()}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(post)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Prev
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={indexOfLastPost >= filteredPosts.length}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>
      {isModalOpen && (
        <PostModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          post={selectedPost}
          refreshPosts={fetchPosts}
        />
      )}
    </div>
  );
};

export default PostTable;
