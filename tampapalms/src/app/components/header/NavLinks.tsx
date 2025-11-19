// file: components/header/NavLinks.tsx

"use client";
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
    // This component now renders the links for either desktop or mobile
    // The parent (Header.tsx) decides WHEN to show it.
    <div  className="flex flex-col md:flex-row md:flex-1 md:justify-evenly items-center md:space-x-4 space-y-4 md:space-y-0 py-4 md:py-0">
      {navLinks.map((link) => (
          <Link
              key={link.href}
              href={link.href}
              passHref
          >
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
      ))}
    </div>
  );
};

export default NavLinks;
