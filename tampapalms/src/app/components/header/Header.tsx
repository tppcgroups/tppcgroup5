// file: components/header/Header.tsx

"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-white p-4 relative z-50">
      <div className="w-full flex items-center justify-between px-4">
        <Logo className="object-contain h-auto" />

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden md:flex flex-1 ml-4 items-center justify-center bg-gray-200 rounded-xl p-6">
          <NavLinks setIsOpen={setIsOpen} />
        </div>

        {/* --- HAMBURGER BUTTON (Mobile Only) --- */}
        {/* The container for the button is now styled */}
        <div className="md:hidden ml-4 bg-gray-200 rounded-xl p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU (Dropdown) --- */}
      {/* The dropdown container is now styled */}
      {isOpen && (
        <div className="md:hidden bg-gray-200 rounded-xl p-6 mx-4 mt-2">
          <NavLinks setIsOpen={setIsOpen} />
        </div>
      )}
    </header>
  );
};

export default Header;
