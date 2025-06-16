import React, { useEffect } from "react";
import { Truck, X } from "lucide-react";

// Props for the Modal Component
interface OrderDetailsModalProps {
  order: {
    id: string;
    date: string;
    status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
    product: string;
    amount: number;
    customer: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onCancel: (orderId: string) => void;
  onShip: (orderId: string) => void;
}

// Reusable Detail Row
const DetailRow: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex justify-between items-center py-3">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{children}</span>
  </div>
);

// Modal Component
const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onCancel,
  onShip,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Order #{order.id}
          </h2>
          <p className="text-sm text-gray-500">Placed on {order.date}</p>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center py-3 border-b border-gray-200">
            <span className="text-gray-500">Status:</span>
            <span className="font-semibold text-orange-500">
              {order.status}
            </span>
          </div>
          <DetailRow label="Product:">{order.product}</DetailRow>
          <DetailRow label="Amount:">${order.amount}</DetailRow>
          <DetailRow label="Customer:">{order.customer}</DetailRow>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <button
            onClick={() => onCancel(order.id)}
            className="flex items-center justify-center gap-2 px-4 py-3 border border-red-500 text-red-500 font-semibold rounded-lg hover:bg-red-50 transition-colors"
          >
            <X size={20} />
            <span>Cancel</span>
          </button>
          <button
            onClick={() => onShip(order.id)}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            <Truck size={20} />
            <span>Ship Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;
