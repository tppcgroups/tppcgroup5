// components/header/NavLinks.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    // Use the app router pathname to determine the active link
    const pathname = usePathname() || "/";

    const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pages/Availability", label: "Office and Executive suits Availability" },
    { href: "/pages/Features", label: "Features & Amenities" },
    { href: "/pages/Maintenance", label: "Maintenance Request" },
    { href: "/pages/Apply", label: "Rental Application" },
    { href: "/pages/Contact", label: "Contact" },
    ];
    return (
      <div className="hidden md:flex flex-1 justify-evenly items-center ">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} passHref>
            <span
              className={`font-medium hover:text-black transition-colors relative px-3 py-2 text-gray-800 
             after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0
             after:bg-gray-600 after:transition-all after:duration-300
             hover:after:w-full${
                pathname === link.href ? "pb-1 border-b-2 border-gray-800" : ""
              }`}
            >
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    );
}

export default NavLinks;