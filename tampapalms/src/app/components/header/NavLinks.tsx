// file: components/header/NavLinks.tsx

"use client";
import { useState, useRef } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {announce} from "@/app/components/RentalApplication/screenReader";
import { ChevronDown } from "lucide-react";

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

const BASE_LINK_CLASSES =
  "relative inline-block font-bold text-gray-800 hover:text-black text-center after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-gray-800 after:transition-all after:duration-500 hover:after:w-full";
const NAV_LINK_FONT_STYLE = (isMobile: boolean): CSSProperties => ({
  fontSize: isMobile
    ? "clamp(1rem, 1.25vw + 0.4rem, 1.4rem)"
    : "clamp(0.85rem, 1vw + 0.35rem, 1.25rem)",
});
const DROPDOWN_LINK_SIZE_CLASSES =
  "text-xs sm:text-sm md:text-base";

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
          // On mobile, show dropdown children as regular links
          if (isMobile) {
            return (
              <div
                key={link.label}
                className="flex flex-col items-center space-y-4 w-full"
              >
                {link.children.map((childLink) => (
                  <Link key={childLink.href} href={childLink.href} passHref>
                    <span
                      onClick={handleLinkClick}
                      onMouseOver={() => announce(childLink.label)}
                      style={NAV_LINK_FONT_STYLE(isMobile)}
                      className={`${BASE_LINK_CLASSES} py-2 ${
                        pathname === childLink.href ? "after:w-full" : ""
                      }`}
                    >
                      {childLink.label}
                    </span>
                  </Link>
                ))}
              </div>
            );
          }

          // --- Desktop Dropdown Link Logic ---
          return (
            <div
              key={link.label}
              className="relative"
              onMouseOver={() => handleDropdownOpen(link.label)}
              onMouseLeave={handleDropdownCloseWithDelay}
            >
              <button
                onClick={() => {
                  handleDropdownToggle(link.label);
                  announce(link.label);
                }}
                style={NAV_LINK_FONT_STYLE(isMobile)}
                className={`${BASE_LINK_CLASSES} py-2 inline-flex items-center justify-center gap-1 group ${
                  openDropdown === link.label ? "after:w-full" : ""
                }`}
                aria-expanded={openDropdown === link.label}
              >
                <span>{link.label}</span>
                <ChevronDown
                  aria-hidden
                  className={`h-4 w-4 sm:h-5 sm:w-5 text-[#1f1a16] transition-transform duration-500 group-hover:text-[#1f1a16] ${
                    openDropdown === link.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === link.label && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md z-10 w-48 mt-2 p-2 flex flex-col items-center space-y-2 text-center"
                  onMouseOver={clearCloseTimeout}
                >
                  {link.children.map((childLink) => (
                    <Link key={childLink.href} href={childLink.href} passHref>
                      <span
                        onClick={handleLinkClick}
                        onMouseOver={() => announce(childLink.label)}
                        className={`${BASE_LINK_CLASSES} ${DROPDOWN_LINK_SIZE_CLASSES} px-3 py-1.5 sm:py-2 ${
                          pathname === childLink.href ? "after:w-full" : ""
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
                style={NAV_LINK_FONT_STYLE(isMobile)}
                className={`${BASE_LINK_CLASSES} py-2 ${
                  pathname === link.href ? "after:w-full" : ""
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
