"use client";

import React, { useState, useEffect } from "react";
import { AlertTriangle } from "lucide-react";

interface OrderSummary {
  id: string;
  product: string;
  customer: string;
}

interface CancelOrderModalProps {
  order: OrderSummary;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

const SummaryRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-500">{label}</span>
    <span className="font-semibold text-gray-800">{value}</span>
  </div>
);

const CancelModalDemoPage: React.FC<CancelOrderModalProps> = ({
  order,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [reason, setReason] = useState("");

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  useEffect(() => {
    if (isOpen) setReason(""); // Reset reason when modal opens
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirmClick = () => {
    if (reason.trim()) {
      onConfirm(reason);
    }
  };

  return (
    <div className="absolute top-0  left-0 right-0 z-50 flex justify-center mt-35 pointer-events-none">
      <div
        className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-md m-4 pointer-events-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">
            Cancel Order?
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Are you sure you want to cancel this order? The customer will be
            notified and the order will be marked as cancelled.
          </p>
        </div>

        <div className="mt-6">
          <label
            htmlFor="cancellation-reason"
            className="block text-lg font-bold text-gray-800"
          >
            Reason for cancellation <span className="text-red-500">*</span>
          </label>
          <textarea
            id="cancellation-reason"
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for cancellation"
            className="mt-2 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-red-400 focus:border-red-400 outline-none"
          />
        </div>

        <div className="mt-6 rounded-lg border border-gray-200 p-4">
          <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
          <div className="space-y-2">
            <SummaryRow label="Order ID:" value={order.id} />
            <SummaryRow label="Product:" value={order.product} />
            <SummaryRow label="Customer:" value={order.customer} />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Keep Order
          </button>
          <button
            onClick={handleConfirmClick}
            disabled={!reason.trim()}
            className="w-full px-4 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelModalDemoPage;
