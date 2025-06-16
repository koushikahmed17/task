// app/page.tsx

import type { NextPage } from "next";
import Head from "next/head";
import { FC } from "react";
import { Download } from "lucide-react";

// --- 1. TYPE DEFINITIONS & MOCK DATA ---

// Define the possible transaction statuses
type TransactionStatus = "Paid" | "Pending" | "Failed";

// Define the structure for a single transaction
interface Transaction {
  id: string;
  productName: string;
  transactionId: string;
  amount: number;
  date: string;
  status: TransactionStatus;
}

// Mock data array simulating a list of transactions from an API
const transactionsData: Transaction[] = [
  {
    id: "1",
    productName: "Wireless Noise-Cancelling Headphones",
    transactionId: "TXN-4532219",
    amount: 249.99,
    date: "May 26, 2025",
    status: "Paid",
  },
  {
    id: "2",
    productName: "Wireless Noise-Cancelling Headphones",
    transactionId: "TXN-4532219",
    amount: 249.99,
    date: "May 26, 2025",
    status: "Pending",
  },
  {
    id: "3",
    productName: "Wireless Noise-Cancelling Headphones",
    transactionId: "TXN-4532219",
    amount: 249.99,
    date: "May 26, 2025",
    status: "Failed",
  },
];

// --- 2. REUSABLE COMPONENTS ---

/**
 * A colored badge to display the transaction status.
 */
interface StatusBadgeProps {
  status: TransactionStatus;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
  const styles: Record<TransactionStatus, string> = {
    Paid: "bg-green-100 text-green-800",
    Pending: "bg-orange-100 text-orange-800",
    Failed: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
};

/**
 * A card that displays the details of a single transaction.
 */
interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  const isActionable = transaction.status === "Paid";

  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center">
      {/* Left side: Transaction details */}
      <div className="flex flex-col">
        <h3 className="text-base font-bold text-gray-900 ">
          {transaction.productName}
        </h3>
        <p className="mt-0.5 text-sm text-gray-500 text-left">
          Transaction ID: {transaction.transactionId}
        </p>
        <p className="mt-3 text-xl font-bold text-gray-900 text-left">
          ${transaction.amount.toFixed(2)}
        </p>
        <p className="mt-0.5 text-sm text-gray-500 text-left">
          {transaction.date}
        </p>
      </div>

      {/* Right side: Status and actions */}
      <div className="flex w-full flex-col items-start gap-4 sm:w-auto sm:items-end">
        <StatusBadge status={transaction.status} />

        <button
          className={`flex items-center justify-center gap-[10px] rounded-[4px] border border-[#D1D5DB] px-[12px] py-[6px] text-sm font-medium shadow-sm transition-colors w-[194px] h-[52px] ${
            isActionable ? "text-gray-700 hover:bg-gray-50" : "text-gray-400"
          }`}
        >
          <Download size={16} />
          {/* Typo is intentional to match the original image */}
          Dowload Reciept
        </button>
      </div>
    </div>
  );
};

// --- 3. MAIN PAGE COMPONENT ---

const PaymentTransactionsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Payment Transactions</title>
        <meta
          name="description"
          content="Track your payments and download receipts"
        />
      </Head>

      <main className="min-h-screen bg-gray-50 ">
        <div className="mx-auto w-full  rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Payment Transactions
            </h1>
            <p className="mt-1 text-base text-gray-600">
              Track your payments and download receipts. All transactions are
              securely processed via XYZ gateway.
            </p>
          </div>

          {/* Transactions List */}
          <div className="space-y-4">
            {transactionsData.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default PaymentTransactionsPage;
