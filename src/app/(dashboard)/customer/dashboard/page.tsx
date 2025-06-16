// app/page.tsx
import React from "react";
import { StatCard, StatCardProps } from "../../../components/StatCard";
import {
  ActivityItem,
  ActivityItemProps,
} from "../../../components/ActivityItem";
import {
  FiPackage,
  FiHeart,
  FiTruck,
  FiGift,
  FiCheckCircle,
  FiFileText,
  FiStar,
  FiTag,
} from "react-icons/fi";

const statCards: StatCardProps[] = [
  {
    title: "Total Orders",
    value: 24,
    icon: <FiPackage />,
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Wishlist Items",
    value: 12,
    icon: <FiHeart />,
    iconBgColor: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    title: "Pending Deliveries",
    value: 3,
    icon: <FiTruck />,
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    title: "Active Coupons",
    value: 5,
    icon: <FiGift />,
    iconBgColor: "bg-green-100",
    iconColor: "text-green-500",
  },
];

const activityItems: ActivityItemProps[] = [
  {
    icon: <FiCheckCircle className="text-green-500" />,
    title: "Order Delivered",
    description: "Your order #ORD-7895 has been delivered",
    timestamp: "Today, 9:45 AM",
  },
  {
    icon: <FiHeart className="text-pink-500" />,
    title: "Added to Wishlist",
    description: "You added 'Wireless Headphones' to your wishlist",
    timestamp: "Yesterday, 4:30 PM",
  },
  {
    icon: <FiFileText className="text-blue-600" />,
    title: "Order Shipped",
    description: "Your order #ORD-7891 has been shipped",
    timestamp: "Yesterday, 11:20 AM",
  },
  {
    icon: <FiStar className="text-orange-400" />,
    title: "Review Posted",
    description: "You posted a review for 'Smart Watch'",
    timestamp: "May 20, 2023",
  },
  {
    icon: <FiTag className="text-purple-500" />,
    title: "Coupon Applied",
    description: "You used coupon 'SUMMER20' on your purchase",
    timestamp: "May 18, 2023",
  },
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Hi, Alex 👋
          </h1>
          <p className="text-sm text-gray-500 mt-2 sm:mt-0">
            Last updated: Today, 10:30 AM
          </p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        {/* Recent Activity Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-6">
            {activityItems.map((item, index) => (
              <ActivityItem key={index} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
