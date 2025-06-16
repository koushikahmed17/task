"use client";

import { useState, useRef, useEffect } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { BiHelpCircle } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  const [languageOpen, setLanguageOpen] = useState<boolean>(false);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);

  const languageRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (languageRef.current && !languageRef.current.contains(target)) {
        setLanguageOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full border-b bg-white font-['Poppins']">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-[#BF2879] font-bold text-[32px] leading-[22px]">
          Logo1
        </div>

        <div className="flex items-center gap-5 text-sm text-[#7D8184] h-10">
          {/* Language Dropdown */}
          <div className="relative" ref={languageRef}>
            <div
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-gray-100"
            >
              <MdLanguage className="w-5 h-5" />
              <span className="text-[16px] font-normal leading-[22px]">EN</span>
              <FaChevronDown className="w-3 h-[6px]" />
            </div>
            {languageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-10">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">EN</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">BN</div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">FR</div>
              </div>
            )}
          </div>

          {/* Help */}
          <div className="flex items-center gap-2 px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
            <BiHelpCircle className="w-5 h-5" />
            <span className="text-[16px] font-normal leading-[22px]">Help</span>
          </div>

          {/* Notifications */}
          <div className="relative w-10 h-10 flex items-center justify-center rounded-md border cursor-pointer">
            <FaBell className="w-[18px] h-[15px]" />
            <span className="absolute top-[2px] right-[6px] w-[12px] h-[12px] text-[10px] font-bold text-white bg-red-600 rounded-full flex items-center justify-center leading-[20px]">
              3
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#F5F5F5] flex items-center justify-center text-xs font-semibold">
                JD
              </div>
              <span className="text-[18px] font-medium leading-[20px] text-black">
                John Doe
              </span>
              <FaChevronDown className="w-2 h-1.5" />
            </div>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  My Account
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </div>
                <div className="p-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center gap-4 h-[92px]">
          <button className="border border-gray-300 px-4 py-2 rounded text-sm flex items-center gap-2 bg-white text-[#7D8184]">
            <span className="text-[16px] leading-[22px]">Categories</span>
            <FaChevronDown className="w-3 h-[6px]" />
          </button>

          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Search by product, brand, or keyword"
              className="w-full border border-gray-300 rounded px-4 py-2 text-[16px] leading-[18px] text-[#7D8184] focus:outline-none focus:ring-2 focus:ring-[#BF2879]"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <button className="bg-[#DB4444] text-white px-4 py-2 rounded text-[18px] font-medium leading-[22px] hover:bg-[#c53030] transition">
            Search
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
