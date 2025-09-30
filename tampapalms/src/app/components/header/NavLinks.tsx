// file: components/header/NavLinks.tsx

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// The component is now simpler
interface NavLinksProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ setIsOpen }) => {
  const pathname = usePathname() || "/";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/pages/Availability", label: "Office & Executive Suites Availability" },
    { href: "/pages/Features", label: "Features & Amenities" },
    { href: "/pages/Maintenance", label: "Maintenance Request" },
    { href: "/pages/Apply", label: "Rental Application" },
    { href: "/pages/Contact", label: "Contact" },
  ];

  // Function to close the menu on mobile when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    // This component now renders the links for either desktop or mobile
    // The parent (Header.tsx) decides WHEN to show it.
    <div className="flex flex-col md:flex-row md:flex-1 md:justify-evenly items-center md:space-x-4 space-y-4 md:space-y-0 py-4 md:py-0">
      {navLinks.map((link) => (
        <Link key={link.href} href={link.href} passHref>
          <span
            onClick={handleLinkClick}
            className={`font-medium text-gray-700 hover:text-black transition-colors ${
              pathname === link.href ? "pb-1 border-b-2 border-gray-800" : ""
            }`}
          >
            {link.label}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
