import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const makeOdd = (num: number) => (num % 2 === 1 ? num : num - 1)
