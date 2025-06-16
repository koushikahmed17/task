"use client";

import type { NextPage } from "next";
import Head from "next/head";
import { FC, useState } from "react";
import { X } from "lucide-react";
import Address from "../../../../components/Address";
import PaymentTransactionsPage from "@/components/Transactions";

// Input field component
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}
const InputField: FC<InputFieldProps> = ({ label, id, ...props }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="block w-full h-[52px] rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
    />
  </div>
);

// Toggle Switch
interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
}
const ToggleSwitch: FC<ToggleSwitchProps> = ({ enabled, setEnabled }) => (
  <button
    type="button"
    onClick={() => setEnabled(!enabled)}
    className={`${
      enabled ? "bg-[#E5484D]" : "bg-gray-200"
    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#E5484D] focus:ring-offset-2`}
    role="switch"
    aria-checked={enabled}
  >
    <span
      className={`${
        enabled ? "translate-x-5" : "translate-x-0"
      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out`}
    />
  </button>
);

// Personal Info Form
const PersonalInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="w-[955px] h-[636px] p-[26px] rounded-[8px] border border-gray-300 bg-white shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Personal Information
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Update your personal details.
        </p>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <InputField
            label="First name"
            id="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            label="Last name"
            id="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <InputField
            label="Email"
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <InputField
            label="Phone"
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
          />
          <div className="sm:col-span-2">
            <label
              htmlFor="bio"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bio
            </label>
            <textarea
              id="bio"
              rows={4}
              className="w-full h-[162px] p-4 rounded-md border border-gray-300 bg-white shadow-sm focus:border-gray-500 focus:ring-gray-500 sm:text-sm"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-3">
          <button
            type="button"
            className="flex items-center gap-2 px-5 py-2.5 w-[132px] h-[52px] rounded border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <X size={16} /> Cancel
          </button>
          <button
            type="submit"
            className="w-[158px] h-[52px] px-5 py-2.5 rounded bg-[#E5484D] text-sm font-medium text-white hover:bg-red-600"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

// Notification Preferences
const NotificationPreferences = () => {
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    wishlistUpdates: true,
  });

  return (
    <div className="w-[955px] h-[512px] p-[26px] rounded-[8px] border border-gray-300 bg-white shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Notification Preferences
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Manage how you receive notifications.
        </p>
      </div>
      <div className="divide-y divide-gray-200">
        {Object.entries(preferences).map(([key, value]) => (
          <div key={key} className="py-4 flex items-center justify-between">
            <span className="text-sm text-gray-800">
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </span>
            <ToggleSwitch
              enabled={value}
              setEnabled={(val) =>
                setPreferences((p) => ({ ...p, [key]: val }))
              }
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          type="button"
          className="w-[179px] h-[52px] px-5 py-2.5 rounded bg-[#E5484D] text-sm font-medium text-white hover:bg-red-600"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

// Main Page
const ProfilePage: NextPage = () => {
  const [activeTab, setActiveTab] = useState("Personal");
  const tabs = ["Personal", "Address", "Transactions"];

  return (
    <>
      <Head>
        <title>Profile Settings</title>
        <meta name="description" content="Profile settings page" />
      </Head>

      <main className="min-h-screen border   py-8 flex justify-center">
        <div className="w-[955px]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <p className="mt-1 text-gray-600">
              Manage your account settings and preferences.
            </p>
          </div>

          <div className="mb-8">
            <div className="w-[955px] h-[60px] p-[6px] rounded-[8px] bg-[#F0F3F6] border border-gray-300 flex space-x-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full h-[48px] px-5 py-2.5 rounded-[8px] text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? "bg-white text-gray-800 shadow-sm border border-gray-300"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="">
            {activeTab === "Personal" && (
              <>
                <PersonalInfoForm />
                <NotificationPreferences />
              </>
            )}
            {activeTab === "Address" && (
              <div className="rounded-lg   shadow-sm text-center">
                <Address />
              </div>
            )}
            {activeTab === "Transactions" && (
              <div className="rounded-lg border border-gray-200  shadow-sm text-center">
                <PaymentTransactionsPage />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;
