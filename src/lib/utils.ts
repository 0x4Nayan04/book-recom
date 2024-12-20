import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const genres = [
  { id: 'fiction', name: 'Fiction' },
  { id: 'non-fiction', name: 'Non-Fiction' },
  { id: 'mystery', name: 'Mystery' },
  { id: 'sci-fi', name: 'Science Fiction' },
  { id: 'fantasy', name: 'Fantasy' },
]; 