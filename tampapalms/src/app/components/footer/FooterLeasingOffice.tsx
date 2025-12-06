import Image from "next/image";
import Link from "next/link";

// Displays the leasing office address alongside the brand lockup.
export function FooterLeasingOffice() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 border-white/10 text-sm text-white md:border-l md:pl-4">
        <p className="font-semibold uppercase tracking-[0.25em] text-[#f0d4a6]">
          Leasing Office
        </p>
        <p>17427 Bridge Hill Ct STE C</p>
        <p>Tampa, FL 33647</p>

        <Link href="/pages/Home" className="inline-flex items-center">
          <Image
            src="/images/TampaPalmsLogo.png"
            alt="Tampa Palms Professional Center Logo"
            width={195}
            height={70}
            className="object-contain h-auto"
          />
        </Link>
      </div>
    </div>
  );
}

export default FooterLeasingOffice;
