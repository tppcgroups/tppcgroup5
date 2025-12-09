// components/header/Logo.tsx
"use client";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import projectConfig from "../../../../../config.json" assert { type: "json" };

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps>= ({className}) => {
  const logoSrc =
    projectConfig?.homePage?.assets?.logo ||
    projectConfig?.branding?.logo ||
    "/images/TampaPalmsLogo.png";

  return (
    <div className="flex-shrink-0 -ml-2 md:ml-4 py-2 pb-6">
      <Link href="/" passHref>
        <Image
          src={logoSrc}
          alt="Tampa Palms Professional Center Logo"
          width={195}
          height={80}
          className={className || "h-12 w-auto md:h-14 lg:h-[68px]"}
        />
      </Link>
    </div>
  );
};
export default Logo;
