import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { createClient } from 'next-sanity'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-03-19', // Use current date
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_ACCESS_TOKEN,
}) 