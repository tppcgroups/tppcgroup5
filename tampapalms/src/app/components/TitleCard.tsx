import React from "react";

interface TitleCardProps {
  title: string;
  eyebrow?: string;
  align?: "left" | "center";
  kicker?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({
  title,
  eyebrow,
  align = "left",
  kicker,
}) => {
  const alignStyles =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-3 ${alignStyles}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#a49382]">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-[#1f1a16] md:text-4xl">
        {title}
      </h2>
      <span
        aria-hidden="true"
        className={`h-1 w-12 rounded-full bg-[#c8b79f] ${
          align === "center" ? "" : "ml-0"
        }`}
      />
      {kicker && (
        <p className="max-w-2xl text-sm text-[#7a6754] md:text-base">{kicker}</p>
      )}
    </div>
  );
};

export default TitleCard;
