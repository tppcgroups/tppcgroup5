// components/header/NavLinks.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
    // Use the app router pathname to determine the active link
    const pathname = usePathname() || "/";
<<<<<<< Updated upstream

    const navLinks = [
      { href: "/", label: "Home" },
      {
        href: "/pages/Availability",
        label: "Office and Executive suits Availability",
      },
      { href: "/pages/Features", label: "Features & Amenities" },
      { href: "/pages/Maintenance", label: "Maintenance Request" },
      { href: "/pages/Apply", label: "Rental Application" },
      { href: "/pages/Contact", label: "Contact" },
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

=======

    const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pages/Availability", label: "Office and Executive suits Availability" },
    { href: "/pages/Features", label: "Features & Amenities" },
    { href: "/pages/Maintenance", label: "Maintenance Request" },
    { href: "/pages/Apply", label: "Rental Application" },
    { href: "/pages/Contact", label: "Contact" },
    ];
    return (
      <div className="hidden md:flex flex-1 justify-evenly items-center">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} passHref>
            <span
              className={`font-medium text-[15px] text-gray-700 hover:text-black transition-colors ${
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

>>>>>>> Stashed changes
export default NavLinks;