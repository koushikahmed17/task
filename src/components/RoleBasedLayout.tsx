// components/RoleBasedLayout.tsx
"use client";

import { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";

const RoleBasedLayout = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  if (!role) return null; // or loading spinner

  if (role === "admin") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <UserLayout>{children}</UserLayout>;
};

export default RoleBasedLayout;
