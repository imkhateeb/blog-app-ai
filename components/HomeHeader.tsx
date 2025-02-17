"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

const HomeHeader = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let userId: string | null = null;

  useEffect(() => {
    if (window === undefined) return;
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
    userId = localStorage.getItem("userId");
  }, []);

  return (
    <div className="bg-black">
      <div className="justify-center gap-8 p-4 w-[600px] max-sm:w-full bg-white text-black mx-auto rounded-b-3xl">
        <div className="flex items-center justify-between">
          <Link href="/">
            <h1 className="text-xl font-bold">BlogWise</h1>
          </Link>
          <div className="flex gap-5 items-center">
            <Link href={"/"}>Home</Link>
            <Link href={"/blogs"}>Blogs</Link>
            <Link href={"/profile/" + userId}>Profile</Link>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  localStorage.removeItem("refreshToken");
                  localStorage.removeItem("userId");
                  window.location.href = "/";
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">Login</Link>
              <Link href="/sign-up">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
