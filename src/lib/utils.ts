import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Remove Vietnamese accents/diacritics from a string
 * @param str - String with Vietnamese accents
 * @returns String without accents, in lowercase
 */
export function removeVietnameseAccents(str: string): string {
  if (!str) return "";
  
  // Normalize and remove combining diacritical marks
  let result = str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  
  // Replace đ/Đ with d
  result = result.replace(/đ/g, "d").replace(/Đ/g, "d");
  
  return result;
}
