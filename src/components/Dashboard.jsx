"use client";
import React from "react";
import { BsDot } from "react-icons/bs";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] min-h-screen font-poppins">
      {/* Welcome Message */}
      <div>
        <h1 className="text-[30px] font-semibold leading-[32px] text-black">
          Welcome back, John Doe!
        </h1>
        <p className="text-[18px] leading-[24px] font-normal text-gray-600">
          You’ve made <span className="font-bold text-black">$2,450</span>{" "}
          today.
        </p>
      </div>

      {/* Sales Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            title: "Sales Today",
            amount: "$2,450",
            change: "+15% from last period",
          },
          {
            title: "Sales This Week",
            amount: "$10,230",
            change: "+8% from last period",
          },
          {
            title: "Sales This Month",
            amount: "$45,670",
            change: "+12% from last period",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="w-full h-[126px] rounded-[8px] p-[25px] border bg-white shadow-sm"
          >
            <p className="text-[14px] font-medium text-gray-500">
              {item.title}
            </p>
            <p className="text-[24px] font-bold leading-[32px] mt-1">
              {item.amount}
            </p>
            <p className="text-[14px] font-medium text-[#0ACC58] mt-1">
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* Orders Status */}
      <div className="bg-white border border-gray-300 rounded-[8px] p-4 shadow-sm">
        <p className="text-[20px] font-semibold mb-4">Orders Status</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {[
            { label: "Pending", value: 12, color: "text-orange-500" },
            { label: "Shipped", value: 24, color: "text-blue-600" },
            { label: "Delivered", value: 156, color: "text-green-600" },
            { label: "Cancelled", value: 3, color: "text-red-500" },
          ].map((status, idx) => (
            <div
              key={idx}
              className="border border-gray-300 rounded-[8px] p-[10px] flex items-center space-x-2"
            >
              <BsDot className={`text-2xl ${status.color}`} />
              <div>
                <p className="text-[16px] text-gray-500">{status.label}</p>
                <p className="text-[20px] font-semibold leading-[28px]">
                  {status.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Trend */}
      <div className="bg-white border border-[#264D82] rounded-[8px] p-[25px] shadow-sm">
        <p className="text-[20px] font-semibold leading-[28px] mb-4">
          Revenue Trend (30 days)
        </p>
        <div className="h-[204px] rounded-[6px] bg-[#F3F4F6] flex items-center justify-center text-[#7D8184] text-[16px] leading-[24px]">
          Revenue Chart
        </div>
      </div>

      {/* Warning Banner */}
      <div className="bg-[#FFF7ED] border border-[#FCCF9C] shadow-sm rounded-[8px] p-[17px] flex justify-between items-center">
        <p className="text-sm text-orange-800 flex-1">
          ⚠️ You have 2 products running low. Restock now.
        </p>
        <button className="bg-white text-[#C77414] border border-orange-300 rounded-[6px] px-[17px] py-[9px] text-[14px] font-medium hover:bg-orange-100">
          View Products
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
