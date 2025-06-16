"use client";

import { usePathname } from "next/navigation";
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";
import Link from "next/link";
import { ReactElement } from "react";

interface MenuItem {
  label: string;
  icon: ReactElement;
  path: string;
}

const menuItems: MenuItem[] = [
  { label: "Overview", icon: <FiHome />, path: "/Overview" },
  { label: "Products", icon: <FiBox />, path: "/Product" },
  { label: "Orders", icon: <FiShoppingCart />, path: "/order" },
  { label: "Payments", icon: <FiCreditCard />, path: "/customer/dashboard" },
  { label: "Settings", icon: <FiSettings />, path: "/customer/order" },
];

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white p-4">
      <div className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;

          return (
            <Link
              href={item.path}
              key={item.label}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition cursor-pointer 
                ${
                  isActive
                    ? "bg-red-50 text-red-500 font-medium"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
