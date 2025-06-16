// app/page.tsx

"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { Plus, ShoppingCart, Trash2, Store, Building2 } from "lucide-react";
import { FC, ComponentType } from "react";

// --- 1. TYPE DEFINITIONS & MOCK DATA ---

interface WishlistItemData {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface WishlistGroupData {
  id: number;
  storeName: string;
  storeIcon: ComponentType<{ className?: string }>;
  items: WishlistItemData[];
}

const wishlistsData: WishlistGroupData[] = [
  {
    id: 1,
    storeName: "Tech Gadget Store",
    storeIcon: Building2,
    items: [
      {
        id: 101,
        name: "Wireless Noise-Cancelling Headphones",
        description: "Black | Premium Edition",
        price: 249.99,
      },
      {
        id: 102,
        name: "Wireless Noise-Cancelling Headphones",
        description: "Black | Premium Edition",
        price: 249.99,
      },
    ],
  },
  {
    id: 2,
    storeName: "Super Gadgets",
    storeIcon: Store,
    items: [
      {
        id: 201,
        name: "Wireless Noise-Cancelling Headphones",
        description: "Black | Premium Edition",
        price: 249.99,
      },
      {
        id: 202,
        name: "Wireless Noise-Cancelling Headphones",
        description: "Black | Premium Edition",
        price: 249.99,
      },
    ],
  },
];

// --- 2. COMPONENTS ---

const WishlistItem: FC<{ item: WishlistItemData }> = ({ item }) => (
  <div className="flex items-center gap-[40px] py-5">
    <input
      type="checkbox"
      className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-500"
    />
    {/* Image Placeholder */}
    <div className="h-[96px] w-[96px] rounded-md bg-[#D9D9D9]" />

    <div className="flex-grow">
      <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.description}</p>
      <p className="mt-2 text-lg font-bold text-gray-900">
        ${item.price.toFixed(2)}
      </p>
    </div>

    <div className="flex flex-col items-end justify-between self-stretch py-1">
      <button className="text-gray-400 hover:text-red-500 transition-colors">
        <Trash2 size={20} />
      </button>
      <button className="mt-2 flex items-center justify-center gap-[10px] rounded-md bg-[#DB4444] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 transition-colors w-[159px] h-[48px]">
        <ShoppingCart size={16} />
        Add to Cart
      </button>
    </div>
  </div>
);

const WishlistGroup: FC<{ group: WishlistGroupData }> = ({ group }) => {
  const Icon = group.storeIcon;
  return (
    <div className="rounded-[8px] border border-gray-300 bg-white p-5 w-full max-w-[956px]">
      <div className="flex items-center gap-4 border-b border-gray-200 pb-4">
        <input
          type="checkbox"
          className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 text-red-600 focus:ring-red-500"
        />
        <Icon className="h-6 w-6 text-gray-500" />
        <h2 className="text-base font-medium text-gray-800">
          {group.storeName}
        </h2>
      </div>
      <div className="divide-y divide-gray-200 pt-4">
        {group.items.map((item) => (
          <WishlistItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// --- 3. MAIN PAGE ---

const WishlistPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta
          name="description"
          content="Wishlist page built with Next.js and Tailwind CSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-[956px]">
          {/* Header */}
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Wishlist</h1>
              <p className="mt-1 text-gray-600">
                Manage your saved items across multiple wishlists.
              </p>
            </div>
            <button className="w-[198px] h-[52px] flex items-center justify-center gap-[10px] rounded-[4px] bg-[#DB4444] px-[20px] py-[10px] text-sm font-medium text-white shadow-sm hover:bg-red-600 transition-colors">
              <Plus size={16} />
              Create New List
            </button>
          </div>

          {/* Add All to Cart Button */}
          <button className="mb-6 flex w-full items-center gap-[40px] rounded-[8px] border border-gray-300 bg-white px-5 py-4 text-left text-gray-700 hover:bg-gray-50 transition-colors">
            <Plus size={20} className="text-gray-500" />
            <span className="font-medium">Add All To Cart</span>
          </button>

          {/* Wishlist Groups */}
          <div className="space-y-[10px]">
            {wishlistsData.map((group) => (
              <WishlistGroup key={group.id} group={group} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};

export default WishlistPage;
