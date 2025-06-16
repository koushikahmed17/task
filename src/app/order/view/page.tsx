"use client";

import { NextPage } from "next";
import Head from "next/head";
import {
  ArrowLeft,
  Printer,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  CheckCircle2,
  X,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import CancelOrderModal from "@/Model/CancelModalDemoPage"; // Ensure path is correct

type TimelineStatus = "completed" | "current" | "upcoming";

interface TimelineStepProps {
  status: TimelineStatus;
  title: string;
  subtitle: string;
  isLast?: boolean;
}

interface OrderSummary {
  id: string;
  product: string;
  customer: string;
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  status,
  title,
  subtitle,
  isLast = false,
}) => {
  const isCompleted = status === "completed";
  const isCurrent = status === "current";

  return (
    <div className="relative flex items-start">
      {!isLast && (
        <div className="absolute left-4 top-5 h-full w-0.5 bg-gray-200"></div>
      )}
      <div className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white">
        {isCompleted ? (
          <CheckCircle2 className="h-6 w-6 text-blue-500" />
        ) : (
          <div
            className={`h-6 w-6 rounded-full border-2 ${
              isCurrent ? "border-blue-500" : "border-gray-300"
            } bg-white flex items-center justify-center`}
          >
            {isCurrent && (
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            )}
          </div>
        )}
      </div>
      <div className="ml-4">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
};

const OrderDetailsPage: NextPage = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const orderSummary: OrderSummary = {
    id: "Ord-001",
    product: "Over The Head Wireless Headphone",
    customer: "Mike Turner",
  };

  const timelineData: Omit<TimelineStepProps, "isLast">[] = [
    { status: "completed", title: "Order Placed", subtitle: "May 15, 2025" },
    {
      status: "completed",
      title: "Payment Confirmed",
      subtitle: "May 15, 2025",
    },
    {
      status: "current",
      title: "Processed",
      subtitle: "Waiting for processing",
    },
    { status: "upcoming", title: "Shipped", subtitle: "Not shipped yet" },
    {
      status: "upcoming",
      title: "Delivered",
      subtitle: "Waiting for delivery",
    },
  ];

  const handleConfirmCancellation = (reason: string) => {
    console.log("Order cancelled for reason:", reason);
    setIsCancelModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>Order Details</title>
        <meta name="description" content="Detailed view of an order" />
      </Head>

      <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-[955px] mx-auto bg-white p-5 rounded-lg border border-gray-300 space-y-6">
          {/* Header */}
          <header className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="p-1 rounded-full hover:bg-gray-200">
                <ArrowLeft className="h-6 w-6 text-gray-800" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                Order Details
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                <Printer size={16} />
                Print Invoice
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600">
                <Phone size={16} />
                Contact Buyer
              </button>
            </div>
          </header>
          {/* Product Summary */}
          <div className="w-[664px] h-[150px] p-5 gap-[10px] flex items-start border border-[#D1D5DB] rounded-[6px] bg-white">
            {/* Image/Thumbnail Box */}
            <div className="w-[110px] h-[110px] bg-[#D9D9D9] rounded-[6px] flex-shrink-0" />

            {/* Product Details */}
            <div className="flex-grow">
              {/* Title and Status */}
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-semibold text-gray-800">
                  {orderSummary.product}
                </h2>
                <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-600 rounded-full">
                  Pending
                </span>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-[10px] gap-x-[32px] mt-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-normal text-gray-800">{orderSummary.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-normal text-gray-800 ">May 15, 2025</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="font-normal text-gray-800">1</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Condition</p>
                  <p className="font-normal text-gray-800">New</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Timeline */}
            <div className="border border-gray-300 p-5 rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Timeline</h3>
              <div className="space-y-4">
                {timelineData.map((step, index) => (
                  <TimelineStep
                    key={index}
                    {...step}
                    isLast={index === timelineData.length - 1}
                  />
                ))}
              </div>
            </div>

            {/* Buyer Info & Payment Info */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Buyer Info */}
              <div className="border border-gray-300 p-5 rounded-md bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Buyer Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Buyer</p>
                    <p className="font-semibold text-gray-800">
                      {orderSummary.customer}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <Mail size={14} />
                      <span>example@email.com</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shipping Address</p>
                    <div className="flex items-start gap-2 text-sm text-gray-600 mt-1">
                      <MapPin size={16} className="mt-0.5" />
                      <span>62 Elm Tree Ave, Coventry, West Midlands, UK</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <CreditCard size={16} />
                      <div>
                        <p className="font-semibold text-gray-800">
                          Credit Card
                        </p>
                        <p>**** **** **** 4242</p>
                      </div>
                      <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                        Paid
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="border border-gray-300 p-5 rounded-md bg-white">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Payment Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-800">$99.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-gray-800">$00.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium text-gray-800">$00.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Discount</span>
                    <span className="font-medium text-gray-800">$00.00</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-lg text-gray-900">
                    $99.99
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-start items-center gap-3">
            {/* Cancel Button */}
            <button
              className="flex items-center gap-[6px] px-4 py-2 w-[169px] h-[52px] bg-white border border-[#F9D2D9] rounded-[4px] text-sm font-semibold text-red-500 hover:bg-red-50"
              onClick={() => setIsCancelModalOpen(true)}
            >
              <X size={16} />
              Cancel Order
            </button>

            {/* Ship Button */}
            <button className="flex items-center gap-[6px] px-4 py-2 w-[147px] h-[52px] bg-[#DB4444] text-white rounded-[4px] text-sm font-semibold hover:bg-red-600">
              <Truck size={16} />
              Ship Order
            </button>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <CancelOrderModal
        isOpen={isCancelModalOpen}
        order={orderSummary}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancellation}
      />
    </>
  );
};

export default OrderDetailsPage;
