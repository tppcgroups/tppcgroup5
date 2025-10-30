// file: components/header/NavLinks.tsx

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// The component is now simpler
interface NavLinksProps {
  setIsOpen: (isOpen: boolean) => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ setIsOpen }) => {
  const pathname = usePathname() || "/";
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const navLinks = [
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
    { href: "/pages/Contact", label: "Contact" },
    { href: "/pages/About", label: "About" },
  ];

  // Function to close the menu on mobile when a link is clicked
  const handleLinkClick = () => {
    setIsOpen(false);
    clearCloseTimeout();
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (label: string) => {
    clearCloseTimeout();
    setOpenDropdown((prev) => (prev === label ? null : label));
  };

  const handleDropdownOpen = (label: string) => {
    clearCloseTimeout();
    setOpenDropdown(label);
  };

  const handleDropdownCloseWithDelay = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      closeTimeoutRef.current = null;
    }, 200);
  };

  useEffect(() => {
    return () => {
      clearCloseTimeout();
    };
  }, []);

  return (
    // This component now renders the links for either desktop or mobile
    // The parent (Header.tsx) decides WHEN to show it.
    <div className="flex flex-col md:flex-row md:flex-1 md:justify-evenly items-center md:space-x-4 space-y-4 md:space-y-0 py-4 md:py-0">
      {navLinks.map((link) => {
        const isActive = link.href
          ? pathname === link.href
          : link.children?.some((child) => pathname === child.href);

        const underlineBase =
          "after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-500";
        const baseClasses = `relative font-bold text-xl py-2 text-gray-800 hover:text-black ${underlineBase} ${
          isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
        }`;

        if (link.children) {
          const isDropdownOpen = openDropdown === link.label;
          const dropdownUnderline =
            isDropdownOpen || isActive
              ? "after:w-full"
              : "after:w-0 md:hover:after:w-full";
          const dropdownClasses = `relative inline-flex items-center justify-center px-4 py-2 text-center text-xl font-bold text-gray-800 hover:text-black ${underlineBase} ${dropdownUnderline} mx-auto md:mx-0`;
          return (
            <div
              key={link.label}
              className="relative flex w-full flex-col items-center md:w-auto md:items-start"
              onMouseEnter={() => handleDropdownOpen(link.label)}
              onMouseLeave={handleDropdownCloseWithDelay}
            >
              <button
                type="button"
                onClick={() => handleDropdownToggle(link.label)}
                aria-expanded={openDropdown === link.label}
                aria-haspopup="true"
                className={dropdownClasses}
              >
                {link.label}
              </button>
              <div
                className={`flex flex-col items-center md:items-stretch md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full md:z-20 md:mt-2 md:min-w-[220px] md:rounded-lg md:border md:border-white/30 bg-white/70 md:bg-white/70 backdrop-blur-md md:shadow-lg transition-all duration-300 ease-out md:duration-200 transform origin-top overflow-hidden md:overflow-visible w-full md:w-auto ${
                  isDropdownOpen
                    ? "max-h-96 opacity-100 scale-100 md:translate-y-1 translate-y-0 pointer-events-auto"
                    : "max-h-0 opacity-0 scale-95 md:-translate-y-2 pointer-events-none"
                }`}
              >
                {link.children.map((child) => {
                  const childActive = pathname === child.href;
                  return (
                    <Link key={child.href} href={child.href} passHref>
                      <div className="flex items-center justify-center ">
                        <span
                          onClick={handleLinkClick}
                          className={`relative inline-flex px-4 py-2 text-xl font-bold text-gray-800 hover:text-black ${underlineBase} ${
                            childActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                          }`}
                        >
                          {child.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <Link key={link.href} href={link.href!} passHref>
            <span onClick={handleLinkClick} className={baseClasses}>
              {link.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
