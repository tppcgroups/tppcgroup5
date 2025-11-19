import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeSuiteToken = (
  value?: string | null
): string => {
  if (!value) return ""
  return value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .replace(/^suite/, "")
}

export const deriveSuiteKey = (
  suiteNumber: string | null | undefined,
  buildingId: string
): string => {
  const direct = normalizeSuiteToken(suiteNumber)
  if (direct) return direct
  const parts = buildingId?.split("-")
  const fallback = parts?.[parts.length - 1]
  return normalizeSuiteToken(fallback)
}
