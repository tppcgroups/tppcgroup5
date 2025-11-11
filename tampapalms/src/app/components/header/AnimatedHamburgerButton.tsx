// file: src/app/components/header/AnimatedHamburgerButton.tsx

"use client";

interface AnimatedHamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export const AnimatedHamburgerButton: React.FC<
  AnimatedHamburgerButtonProps
> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="relative h-8 w-8 transition-colors"
      aria-label="Toggle navigation menu"
    >
      {/* Create three spans to represent the lines of the hamburger icon */}
      <span
        className={`absolute top-[25%] left-0 block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
          isOpen ? "rotate-45 translate-y-1.5" : ""
        }`}
      ></span>
      <span
        className={`absolute top-[45%] left-0 block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      ></span>
      <span
        className={`absolute top-[65%] left-0 block h-0.5 w-full bg-gray-800 transition-all duration-300 ${
          isOpen ? "-rotate-45 -translate-y-1.5" : ""
        }`}
      ></span>
    </button>
  );
};
