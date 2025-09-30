// file: components/Footer.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../header/Logo";

export function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      <div className="container mx-auto px-8 py-12">
        {/* Main layout changed to flexbox */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <Logo className="object-contain h-auto" />
          </div>

          {/* Right Side: Grouped Info (Links, Hours, Contact) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1: Quick Links */}
            <div>
              <h3 className="font-bold text-white uppercase mb-4">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-2">
                <Link href="/pages/Home" className="hover:text-white">
                  Home
                </Link>
                <Link href="/pages/Availability" className="hover:text-white">
                  Availability
                </Link>
                <Link href="/pages/Features" className="hover:text-white">
                  Features & Amenities
                </Link>
                <Link href="/pages/Apply" className="hover:text-white">
                  Apply Now
                </Link>
                <Link href="/pages/Maintenance" className="hover:text-white">
                  Maintenance Request
                </Link>
                <Link href="/pages/Contact" className="hover:text-white">
                  Contact
                </Link>
              </nav>
            </div>

            {/* Column 2: Hours */}
            <div>
              <h3 className="font-bold text-white uppercase mb-4">Hours</h3>
              <div className="space-y-2">
                <p>Mon – Thu: 9am – 5pm</p>
                <p>Fri: 9am – 3pm</p>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="font-bold text-white uppercase mb-4">Contact</h3>
              <div className="space-y-2">
                <p>
                  17427 Bridge Hill Ct STE C
                  <br />
                  Tampa, FL 33647
                </p>
                <p>
                  <a href="tel:555-555-5555" className="hover:text-white">
                    (813) 876-7697
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright */}
      <div className="bg-neutral-800 py-4">
        <div className="container mx-auto px-8 text-center text-sm">
          &copy; {new Date().getFullYear()} Tampa Palms Professional Center. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
export default Footer;