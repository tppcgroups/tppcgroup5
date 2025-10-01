// components/header/Logo.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps>= ({className}) => {
  return (
    <div className="flex-shrink-0 -ml-2 md:ml-4 pb-7">
      <Link href="/" passHref>
        <Image
          src="/images/TampaPalmsLogo.png"
          alt="Tampa Palms Professional Center Logo"
          width={210}
          height={50}
          className={className || ""}
        />
      </Link>
    </div>
  );
};
export default Logo;
