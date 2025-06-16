"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { Search, Eye, Truck } from "lucide-react";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the modal
const OrderDetailsModal = dynamic(() => import("@/Model/OrderDetailsModal"), {
  ssr: false,
});

// --- Type Definitions ---
type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

interface Order {
  id: string;
  date: string;
  buyer: string;
  amount: number;
  status: OrderStatus;
}

// --- Mock Data ---
const mockOrders: Order[] = [
  {
    id: "Ord-01",
    date: "May 15, 2025",
    buyer: "Mike Turner",
    amount: 200,
    status: "Pending",
  },
  {
    id: "Ord-02",
    date: "May 14, 2025",
    buyer: "Mike Turner",
    amount: 100,
    status: "Shipped",
  },
  {
    id: "Ord-03",
    date: "May 14, 2025",
    buyer: "Mike Turner",
    amount: 300,
    status: "Delivered",
  },
  {
    id: "Ord-04",
    date: "May 13, 2025",
    buyer: "Mike Turner",
    amount: 100,
    status: "Cancelled",
  },
  {
    id: "Ord-05",
    date: "May 15, 2025",
    buyer: "Mike Turner",
    amount: 500,
    status: "Delivered",
  },
  {
    id: "Ord-06",
    date: "May 15, 2025",
    buyer: "Mike Turner",
    amount: 50,
    status: "Delivered",
  },
];

// --- Components ---
const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-medium rounded-full inline-block";
  const statusClasses: Record<OrderStatus, string> = {
    Pending: "bg-orange-100 text-orange-600",
    Shipped: "bg-blue-100 text-blue-600",
    Delivered: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
  };
  return (
    <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>
  );
};

const TabButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}> = ({ label, isActive, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`px-6 py-2 rounded-lg text-sm transition-all duration-200 ${
      isActive
        ? "bg-white text-gray-800 font-semibold shadow-sm"
        : "text-gray-500 hover:text-gray-700"
    } ${className}`}
  >
    {label}
  </button>
);

// --- Main Page ---
const OrdersPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<OrderStatus | "All">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const tabs: (OrderStatus | "All")[] = [
    "All",
    "Pending",
    "Shipped",
    "Cancelled",
  ];

  const filteredOrders = useMemo(() => {
    return mockOrders
      .filter((order) => activeTab === "All" || order.status === activeTab)
      .filter((order) => {
        const term = searchTerm.toLowerCase();
        return (
          order.id.toLowerCase().includes(term) ||
          order.buyer.toLowerCase().includes(term)
        );
      });
  }, [searchTerm, activeTab]);

  // --- Modal Handlers ---
  const handleOpenShipModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleCancelOrder = (orderId: string) => {
    alert(`Cancelling order: ${orderId}`);
    handleCloseModal();
  };

  const handleShipOrder = (orderId: string) => {
    alert(`Shipping order: ${orderId}`);
    handleCloseModal();
  };

  return (
    <>
      <Head>
        <title>Orders</title>
        <meta name="description" content="Manage your orders" />
      </Head>

      <div className="bg-gray-50 min-h-screen p-4 sm:p-6 md:p-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Orders</h1>

          {/* Search */}
          <div className="relative mb-4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by order id or customer name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Filter Tabs */}
          <div className="w-full md:w-[955px] h-auto md:h-[60px] rounded-[8px] border border-[#D1D5DB] bg-[#F0F3F6] p-[6px] inline-flex flex-wrap md:flex-nowrap items-center mb-6">
            {tabs.map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className="flex-grow md:w-[235.75px] h-[48px] gap-[10px] px-[20px] py-[10px] inline-flex justify-center items-center"
              />
            ))}
          </div>

          {/* Orders Table */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-sm font-medium text-gray-500">
                    Order ID
                  </th>
                  <th className="p-4 text-sm font-medium text-gray-500">
                    Date
                  </th>
                  <th className="p-4 text-sm font-medium text-gray-500">
                    Buyer
                  </th>
                  <th className="p-4 text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="p-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="p-4 text-sm font-medium text-gray-500 text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <td className="p-4 text-sm text-gray-800">{order.id}</td>
                    <td className="p-4 text-sm text-gray-600">{order.date}</td>
                    <td className="p-4 text-sm text-gray-800">{order.buyer}</td>
                    <td className="p-4 text-sm text-gray-800">
                      ${order.amount}
                    </td>
                    <td className="p-4 text-sm">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href="/order/view"
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleOpenShipModal(order)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
                          >
                            <Truck size={16} />
                            Ship
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredOrders.length === 0 && (
              <div className="text-center p-10 text-gray-500">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          order={{
            id: selectedOrder.id,
            date: selectedOrder.date,
            status: "Processing", // Static status for demo
            product: "Wireless Earbuds X200",
            amount: selectedOrder.amount,
            customer: selectedOrder.buyer,
          }}
          onCancel={handleCancelOrder}
          onShip={handleShipOrder}
        />
      )}
    </>
  );
};

export default OrdersPage;
