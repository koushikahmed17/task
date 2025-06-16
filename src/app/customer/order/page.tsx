import React from "react";
import {
  FiSearch,
  FiChevronDown,
  FiRefreshCw,
  FiMapPin,
  FiX,
  FiMoreHorizontal,
} from "react-icons/fi";

// Type definitions for the order data
type OrderStatus = "Delivered" | "Shipped" | "Processing" | "Cancelled";

interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  total: string;
  action: {
    text: string;
    icon: React.ReactElement;
  };
}

// Mock Data based on the image
const ordersData: Order[] = [
  {
    id: "#ORD-12345",
    date: "May 20, 2023",
    status: "Delivered",
    total: "$249.99",
    action: { text: "Buy Again", icon: <FiRefreshCw className="mr-2" /> },
  },
  {
    id: "#ORD-12346",
    date: "May 15, 2023",
    status: "Shipped",
    total: "$399.99",
    action: { text: "Track", icon: <FiMapPin className="mr-2" /> },
  },
  {
    id: "#ORD-12347",
    date: "May 10, 2023",
    status: "Processing",
    total: "$159.98",
    action: { text: "Cancel", icon: <FiX className="mr-2" /> },
  },
  {
    id: "#ORD-12348",
    date: "May 5, 2023",
    status: "Delivered",
    total: "$79.99",
    action: { text: "Buy Again", icon: <FiRefreshCw className="mr-2" /> },
  },
  {
    id: "#ORD-12349",
    date: "April 30, 2023",
    status: "Cancelled",
    total: "$129.99",
    action: { text: "Reorder", icon: <FiRefreshCw className="mr-2" /> },
  },
];

// Reusable Status Badge Component
const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
  const statusStyles: Record<OrderStatus, string> = {
    Delivered: "bg-green-100 text-green-700",
    Shipped: "bg-blue-100 text-blue-700",
    Processing: "bg-orange-100 text-orange-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-semibold leading-tight rounded-full ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

// Main Page Component
const MyOrdersPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-500 mt-1">
            View and manage your order history.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Input */}
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order id"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
          {/* Status Dropdown */}
          <div className="relative">
            <select
              className="appearance-none w-full sm:w-auto bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
              defaultValue="Order Status"
            >
              <option>Order Status</option>
              <option>Delivered</option>
              <option>Shipped</option>
              <option>Processing</option>
              <option>Cancelled</option>
            </select>
            <FiChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Orders List Card */}
        <div className="bg-white rounded-xl shadow-sm">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-200">
            <div className="col-span-2 text-sm font-medium text-gray-500">
              Order ID
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-500">
              Date
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-500">
              Status
            </div>
            <div className="col-span-2 text-sm font-medium text-gray-500">
              Total
            </div>
            <div className="col-span-4 text-sm font-medium text-gray-500">
              Actions
            </div>
          </div>

          {/* Order Rows */}
          <div>
            {ordersData.map((order, index) => (
              <div
                key={order.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-6 ${
                  index !== ordersData.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Order ID */}
                <div className="md:col-span-2">
                  <div className="md:hidden font-medium text-gray-500 mb-1">
                    Order ID
                  </div>
                  <div className="font-medium text-gray-800">{order.id}</div>
                </div>

                {/* Date */}
                <div className="md:col-span-2">
                  <div className="md:hidden font-medium text-gray-500 mb-1">
                    Date
                  </div>
                  <div className="text-gray-600">{order.date}</div>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <div className="md:hidden font-medium text-gray-500 mb-1">
                    Status
                  </div>
                  <StatusBadge status={order.status} />
                </div>

                {/* Total */}
                <div className="md:col-span-2">
                  <div className="md:hidden font-medium text-gray-500 mb-1">
                    Total
                  </div>
                  <div className="font-medium text-gray-800">{order.total}</div>
                </div>

                {/* Actions */}
                <div className="col-span-full md:col-span-4 flex items-center gap-2">
                  <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    {order.action.icon}
                    {order.action.text}
                  </button>
                  <button
                    aria-label="More options"
                    className="p-2.5 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    <FiMoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;
