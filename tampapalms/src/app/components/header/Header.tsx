// components/header/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

const Header = () => {
    return (
        <header className="w-full bg-white p-4">
        <div className="w-full flex items-center px-4">
            <Logo />
            {/* Nav sits to the right of the logo */}
            <nav className="flex-1 ml-4 flex items-center justify-between bg-gray-200 rounded-xl p-6 shadow-sm">
            {/* Navigation Links: middle links take available space and are evenly spaced */}
            <NavLinks />
            </nav>
        </div>
        </header>
    );
};

export default Header;
