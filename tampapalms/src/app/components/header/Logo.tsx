// components/header/Logo.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <div className="flex-shrink-0 -ml-2 md:ml-4 -mt-4">
          <Link href="/" passHref>
            <Image
              src="/TampaPalmsLogo.png"
              alt="Tampa Palms Professional Center Logo"
              width={160}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>
    );
}
export default Logo;