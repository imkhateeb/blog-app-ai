import React, { ReactNode } from "react";
import AdminProvider from "@/components/AdminProvider";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AdminProvider>
      <div>{children}</div>
    </AdminProvider>
  );
};

export default AdminLayout;
