type FooterBottomProps = {
  year: number;
};

// Legal footer with the current year for reuse across pages if needed.
export function FooterBottom({ year }: FooterBottomProps) {
  return (
    <div className="relative border-t border-white/10 bg-black/50 py-6 text-sm text-stone-400">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p>&copy; {year} Tampa Palms Professional Center. All rights reserved.</p>
      </div>
    </div>
  );
}

export default FooterBottom;
