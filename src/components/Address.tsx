"use client"; // This component uses state, so it must be a client component

import type { NextPage } from "next";
import Head from "next/head";
import { FC, useState } from "react";
import { Plus, MapPin, Edit, Trash2, Check } from "lucide-react";

// --- 1. TYPE DEFINITIONS & MOCK DATA ---

interface Address {
  id: number;
  nickname: string;
  lines: string[];
  isDefault: boolean;
}

// Initial data for the addresses, mimicking the image
const initialAddresses: Address[] = [
  {
    id: 1,
    nickname: "Home",
    lines: ["12 Rosewood Lane, Flat 3A", "Manchester, M14 5TP, United Kingdom"],
    isDefault: true,
  },
  {
    id: 2,
    nickname: "Work",
    lines: [
      "Unit 7, Orion Business Park, Buckingham",
      "Avenue, Slough, SL1 4QT, United Kingdom",
    ],
    isDefault: false,
  },
];

// --- 2. REUSABLE COMPONENTS ---

/**
 * Renders a single address card with action buttons.
 */
interface AddressCardProps {
  address: Address;
  onSetDefault: (id: number) => void;
}

const AddressCard: FC<AddressCardProps> = ({ address, onSetDefault }) => {
  return (
    <div className="w-[903px] h-[198px] rounded-[8px] border border-gray-300 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <MapPin className="h-6 w-6 text-gray-700" />
        <h3 className="text-lg font-bold text-gray-900">{address.nickname}</h3>
      </div>

      {/* Address lines now aligned to the left */}
      <div className="mt-4 text-sm text-gray-600 text-left w-[300px]">
        {address.lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {/* All buttons aligned to the left */}
      <div className="mt-6 flex flex-wrap items-start gap-3 sm:gap-4">
        <button className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors">
          <Edit size={16} />
          Edit
        </button>

        <button className="flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:bg-red-50 transition-colors">
          <Trash2 size={16} className="text-red-500" />
          Delete
        </button>

        {address.isDefault ? (
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <Check size={18} className="text-green-600" />
            Default
          </div>
        ) : (
          <button
            onClick={() => onSetDefault(address.id)}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
          >
            Set as Default
          </button>
        )}
      </div>
    </div>
  );
};

// --- 3. MAIN PAGE COMPONENT ---

const AddressesPage: NextPage = () => {
  const [addresses, setAddresses] = useState<Address[]>(initialAddresses);

  const handleSetDefault = (id: number) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <>
      <Head>
        <title>Manage Addresses</title>
        <meta
          name="description"
          content="Manage your shipping and billing addresses"
        />
      </Head>

      <main className="h-full bg-gray-50 flex justify-center items-start ">
        <div className="w-[955px] h-[554px] rounded-[8px] border border-gray-300 bg-white p-[26px] flex flex-col gap-[10px]">
          {/* Page Header */}
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Addresses</h1>
              <p className="mt-1 text-base text-gray-600">
                Manage your shipping and billing addresses.
              </p>
            </div>
            <button className="w-[177px] h-[52px] flex items-center justify-center gap-2 rounded-[4px] bg-[#E5484D] px-5 py-[10px] text-sm font-medium text-white shadow-sm hover:bg-red-700 transition-colors">
              <Plus size={20} />
              Add Address
            </button>
          </div>

          {/* Address Cards */}
          <div className="space-y-[10px]">
            {addresses.map((address) => (
              <AddressCard
                key={address.id}
                address={address}
                onSetDefault={handleSetDefault}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default AddressesPage;
