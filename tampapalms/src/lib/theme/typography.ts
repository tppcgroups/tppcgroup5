import config from "../../../../config.json" assert { type: "json" };

type TypographyKeys = "h1" | "h2" | "h3" | "body" | "small" | "nav" | "button";

const defaults: Record<TypographyKeys, string> = {
  h1: "36px",
  h2: "30px",
  h3: "24px",
  body: "16px",
  small: "14px",
  nav: "16px",
  button: "15px",
};

const typography = { ...defaults, ...(config as any)?.typography };

export const getFontSize = (key: TypographyKeys): string => {
  const value = typography[key];
  return typeof value === "string" && value.trim() ? value : defaults[key];
};
