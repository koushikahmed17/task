"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import GlobalContext from "./Contex";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const context = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    if (!context?.user) {
      router.push("/login");
    }
  }, [context?.user, router]);

  if (!context?.user) return null; // or show loading spinner

  return <>{children}</>;
};

export default PrivateRoute;
