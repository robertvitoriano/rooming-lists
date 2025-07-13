import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateRandomColors(count: number): string[] {
  return Array.from(
    { length: count },
    () =>
      `#${Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")}`
  )
}

export function lightenColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16)

  const r = Math.min(255, (num >> 16) + Math.round(255 * percent))
  const g = Math.min(255, ((num >> 8) & 0x00ff) + Math.round(255 * percent))
  const b = Math.min(255, (num & 0x0000ff) + Math.round(255 * percent))

  return `rgb(${r}, ${g}, ${b})`
}

export function getDayAndMonthFromISOString(dateIsoString: string): {
  month: string
  day: number
  year: number
} {
  const date = new Date(dateIsoString)
  const month = date.toLocaleString("en-US", { month: "short" })
  const day = date.getDate()
  const year = date.getFullYear()
  return { month, day, year }
}
