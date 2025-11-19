// file: components/header/NavLinks.tsx

"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {announce} from "@/app/components/RentalApplication/screenReader";

// The component is now simpler
type LeafLink = { href: string; label: string };
type DropdownLink = { label: string; children: LeafLink[] };
type MenuLink = LeafLink | DropdownLink;

const NAV_LINKS: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/pages/Availability", label: "Availability" },
  { href: "/pages/Features", label: "Features & Amenities" },
  {
    label: "Services",
    children: [
      { href: "/pages/Maintenance", label: "Maintenance" },
      { href: "/pages/Apply", label: "Apply" },
    ],
  },
  { href: "/pages/Testimonials", label: "Testimonials" },
  { href: "/pages/About", label: "About" },
  { href: "/pages/Contact", label: "Contact" },
];

interface NavLinksProps {
  setIsOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
}

const NavLinks: React.FC<NavLinksProps> = ({ setIsOpen, isMobile = false }) => {
  const pathname = usePathname() || "/";

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  // Function to close the menu on mobile when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
    clearCloseTimeout();
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (label: string) => {
    if (isMobile) return;
    clearCloseTimeout();
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleDropdownOpen = (label: string) => {
    if (isMobile) return;
    clearCloseTimeout();
    setOpenDropdown(label);
  };

  const handleDropdownCloseWithDelay = () => {
    if (isMobile) return;
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-1 md:justify-evenly items-center md:space-x-4 space-y-4 md:space-y-0 py-4 md:py-0">
      {NAV_LINKS.map((link) => {
        // 1. Check if the link is a DropdownLink (has 'children')
        if ("children" in link) {
          // --- Dropdown Link Logic ---
          return (
            <div
              key={link.label}
              className="relative"
              onMouseOver={() => handleDropdownOpen(link.label)}
              onMouseLeave={handleDropdownCloseWithDelay}
            >
              <button
                // Use handleDropdownToggle for mobile or desktop click/hover interaction
                onClick={() => {
                  if (isMobile) {
                    setOpenDropdown((prev) =>
                      prev === link.label ? null : link.label
                    );
                  } else {
                    handleDropdownToggle(link.label);
                  }
                  announce(link.label);
                }}
                className={`relative font-bold text-xl py-2 text-gray-800 hover:text-black after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0
                  after:bg-gray-800 after:transition-all after:duration-500
                  hover:after:w-full ${
                    openDropdown === link.label ? "after:w-full" : "after:w-0"
                  }`}
                aria-expanded={openDropdown === link.label}
              >
                {link.label}
              </button>

              {/* Dropdown Menu Content (Hidden on Mobile/Desktop toggle) */}
              {openDropdown === link.label && (
                <div
                  className={`absolute ${
                    isMobile ? "static" : "top-full left-1/2 -translate-x-1/2"
                  } 
                    bg-white shadow-lg rounded-md z-10 w-48 mt-2 p-2 
                    flex flex-col space-y-2`}
                  onMouseOver={clearCloseTimeout}
                >
                  {link.children.map((childLink) => (
                    <Link key={childLink.href} href={childLink.href} passHref>
                      <span
                        onClick={handleLinkClick} // Closes mobile menu and dropdown
                        onMouseOver={() => announce(childLink.label)}
                        className={`block text-lg px-3 py-1 rounded-md transition-colors 
                          ${
                            pathname === childLink.href
                              ? "bg-gray-100 text-black font-semibold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-black"
                          }`}
                      >
                        {childLink.label}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        } else {
          // 2. Simple Link Logic (LeafLink)
          return (
            <Link key={link.href} href={link.href} passHref>
              <span
                onClick={handleLinkClick}
                onMouseOver={() => announce(link.label)}
                className={`relative font-bold text-xl py-2 text-gray-800 hover:text-black after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0
                  after:bg-gray-800 after:transition-all after:duration-500
                  hover:after:w-full ${
                    pathname === link.href
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
                  }`}
              >
                {link.label}
              </span>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default NavLinks;
