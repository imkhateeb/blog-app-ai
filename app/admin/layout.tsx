import React, { ReactNode } from "react";
import AdminProvider from "@/components/AdminProvider";
import AdminSidebar from "@/components/AdminSidebar";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminProvider>
      <div className="flex">
        <AdminSidebar />
        {children}
      </div>
    </AdminProvider>
  );
};

export default AdminLayout;
