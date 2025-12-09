// file: components/header/NavLinks.tsx

"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {announce} from "@/app/components/RentalApplication/screenReader";
import { ChevronDown } from "lucide-react";
import { getFontSize } from "@/lib/theme/typography";

// The component is now simpler
type LeafLink = { href: string; label: string };
type DropdownLink = { label: string; children: LeafLink[] };
type MenuLink = LeafLink | DropdownLink;

const NAV_LINKS: MenuLink[] = [
  { href: "/", label: "Home" },
  { href: "/pages/Availability", label: "Availability" },
  { href: "/pages/Features", label: "Features" },
  // {
  //   label: "Services",
  //   children: [
  //     { href: "/pages/Maintenance", label: "Maintenance" },
  //     { href: "/pages/Apply", label: "Apply" },
  //   ],
  // },
  { href: "/pages/Maintenance", label: "Maintenance" },
  { href: "/pages/Apply", label: "Apply Now" },
  { href: "/pages/Testimonials", label: "Testimonials" },
  { href: "/pages/FAQ", label: "FAQ" },
  { href: "/pages/Contact", label: "Contact" },
];

interface NavLinksProps {
  setIsOpen: (isOpen: boolean) => void;
  isMobile?: boolean;
}

const BASE_LINK_CLASSES =
  "relative inline-block font-bold text-gray-800 hover:text-black text-center after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-gray-800 after:transition-all after:duration-500 hover:after:w-full";
const DROPDOWN_LINK_SIZE_CLASSES =
  "text-xs sm:text-sm md:text-base";

const NavLinks: React.FC<NavLinksProps> = ({ setIsOpen, isMobile = false }) => {
  const pathname = usePathname() || "/";

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (isMobile || !openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, openDropdown]);

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const containerClasses = isMobile
    ? "flex flex-col items-center space-y-6 py-4"
    : "flex flex-col md:flex-row md:flex-1 md:justify-end items-center md:space-x-6 lg:space-x-10 space-y-6 md:space-y-0 py-4 md:py-0";

  const linkStyle = { fontSize: getFontSize("nav") };

  return (
    <div
      ref={navRef}
      className={containerClasses}
    >
      {NAV_LINKS.map((link) => {
        // 1. Check if the link is a DropdownLink (has 'children')
        if ("children" in link) {
          // On mobile, show dropdown children as regular links
          if (isMobile) {
            return (
              <div
                key={link.label}
                className="flex flex-col items-center space-y-5 w-full"
              >
                {link.children.map((childLink) => (
                  <Link key={childLink.href} href={childLink.href} passHref>
                    <span
                      onClick={handleLinkClick}
                      onMouseOver={() => announce(childLink.label)}
                      className={`${BASE_LINK_CLASSES} py-2 ${
                        pathname === childLink.href ? "after:w-full" : ""
                      }`}
                      style={linkStyle}
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
            <div key={link.label} className="relative inline-flex flex-col items-center">
              <button
                onClick={() => {
                  if (openDropdown === link.label) {
                    setOpenDropdown(null);
                  } else {
                    setOpenDropdown(link.label);
                    announce(link.label);
                  }
                }}
                className={`${BASE_LINK_CLASSES} ${linkSizeClasses} py-2 inline-flex items-center justify-center gap-1 group ${
                  openDropdown === link.label ? "after:w-full" : ""
                }`}
                style={linkStyle}
                aria-expanded={openDropdown === link.label}
              >
                <span className="cursor-pointer">{link.label}</span>
                <ChevronDown
                  aria-hidden
                  className={`h-4 w-4 sm:h-5 sm:w-5 text-[#1f1a16] transition-transform duration-300 group-hover:text-[#1f1a16] cursor-pointer ${
                    openDropdown === link.label ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-md z-10 w-48 mt-2 p-3 flex flex-col items-center space-y-2 text-center transition-all duration-500 ease-out ${
                  openDropdown === link.label ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-3"
                }`}
              >
                {link.children.map((childLink) => (
                  <Link key={childLink.href} href={childLink.href} passHref>
                    <span
                      onClick={handleLinkClick}
                      onMouseOver={() => announce(childLink.label)}
                      className={`${BASE_LINK_CLASSES} ${DROPDOWN_LINK_SIZE_CLASSES} px-3 py-1.5 sm:py-2 ${
                        pathname === childLink.href ? "after:w-full" : ""
                      }`}
                      style={linkStyle}
                    >
                      {childLink.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        } else {
          // 2. Simple Link Logic (LeafLink)
          return (
            <Link key={link.href} href={link.href} passHref>
              <span
                onClick={handleLinkClick}
                onMouseOver={() => announce(link.label)}
                className={`${BASE_LINK_CLASSES} py-2 w-full ${
                  pathname === link.href ? "after:w-full" : ""
                }`}
                style={linkStyle}
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
