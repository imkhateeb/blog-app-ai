"use client";

import { ReactNode, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const getUser = async (userId: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
    );
    console.log(response.data);
    if (response?.data?.role === "admin") {
      router.push("/admin");
    }
  };

  useEffect(() => {
    if (window !== undefined) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        getUser(userId);
      }
    }
  }, []);

  return <div>{children}</div>;
};

export default UserProvider;
