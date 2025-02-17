"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MessageSquare } from "lucide-react";

const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin", icon: <Home size={20} /> },
    { name: "Users", href: "/admin/users", icon: <Users size={20} /> },
    { name: "Posts", href: "/admin/posts", icon: <MessageSquare size={20} /> },
    {
      name: "Comments",
      href: "/admin/comments",
      icon: <MessageSquare size={20} />,
    },
  ];

  return (
    <aside className="w-64 h-screen bg-black text-white p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Panel</h2>
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
    </aside>
  );
};

export default AdminSidebar;
