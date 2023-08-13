import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { customAlphabet } from 'nanoid'

 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId() {
  const nanoId = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 16)
  return nanoId()
}
