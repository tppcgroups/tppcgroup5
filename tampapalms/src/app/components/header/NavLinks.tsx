// components/header/NavLinks.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    // Use the app router pathname to determine the active link
    const pathname = usePathname() || "/";

    const navLinks = [
    { href: "/", label: "Home" },
    { href: "/availability", label: "Office and Executive suits Availability" },
    { href: "/features", label: "Features & Amenities" },
    { href: "/maintenance", label: "Maintenance Request" },
    { href: "/apply", label: "Rental Application" },
    { href: "/contact", label: "Contact" },
    ];
    return (
      <div className="hidden md:flex flex-1 justify-evenly items-center">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} passHref>
            <span
              className={`text-sm font-medium text-gray-700 hover:text-black transition-colors ${
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