// app/login/page.tsx
"use client";

import GlobalContext from "@/components/Contex";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const LoginPage = () => {
  const router = useRouter();

  const {user}=useContext(GlobalContext)

  console.log(user,'this is the user for ');

  const handleLogin = (role: string) => {
    localStorage.setItem("userRole", role);
    router.push("/dashboard"); // redirect to dashboard
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Select Role to Login</h1>
      <button
        onClick={() => handleLogin("user")}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        Login as User
      </button>
      <button
        onClick={() => handleLogin("admin")}
        className="px-6 py-2 bg-green-600 text-white rounded"
      >
        Login as Admin
      </button>
    </div>
  );
};

export default LoginPage;
