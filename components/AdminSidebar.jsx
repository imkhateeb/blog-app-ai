"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Users, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "Dashboard", href: "/admin", icon: <Home size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Posts", href: "/admin/posts", icon: <MessageSquare size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <aside className="w-64 h-screen bg-black text-white p-4">
      <h2 className="text-xl font-bold h-[5vh]">BlogWise Admin.</h2>
      <div className="flex flex-col justify-between h-[90vh]">
        <nav className="space-y-2">
          {links.map(({ name, href, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition duration-300 
            ${
              pathname === href
                ? "bg-gray-100 text-black"
                : "hover:bg-gray-100 hover:text-black"
            }`}
            >
              {icon}
              <span>{name}</span>
            </Link>
          ))}
        </nav>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
