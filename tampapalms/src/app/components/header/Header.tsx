// file: components/header/Header.tsx

"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import { AnimatedHamburgerButton } from "./AnimatedHamburgerButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 border-b border-white/30 shadow-[0_6px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/40">
      <div className="w-full flex items-center justify-between px-4 lg:px-6">
        <Logo className="object-contain h-auto" />

        {/* --- DESKTOP NAVIGATION --- */}
        <div className="hidden min-[900px]:flex flex-1 ml-4 items-center justify-end rounded-xl px-4 py-2">
          <NavLinks setIsOpen={setIsOpen} />
        </div>

        {/* --- HAMBURGER BUTTON (Mobile Only) --- */}
        {/* The container for the button is now styled */}
        <div className="min-[900px]:hidden ml-4 rounded-xl p-2 flex items-center transparent justify-center">
          {/* 2. Replace the old button with the new animated one */}
          <AnimatedHamburgerButton
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>

      {/* --- MOBILE MENU (Dropdown) --- */}
      {/* The dropdown container is now styled */}
      <div
        className={`min-[900px]:hidden mx-4 overflow-hidden rounded-xl transparent transition-all duration-500 ${
          isOpen ? "max-h-96 opacity-100 p-4" : "max-h-0 opacity-0 p-0"
        }`}
      >
        <NavLinks setIsOpen={setIsOpen} isMobile />
      </div>
    </header>
  );
};

export default Header;
