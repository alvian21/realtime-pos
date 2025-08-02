import { clsx, type ClassValue } from "clsx"
import { ChangeEvent } from "react"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const file = event.target.files![0];
  const displayUrl = URL.createObjectURL(file);
  return { file, displayUrl };
}

export function formatDate(isoDate: string){
  return dayjs(isoDate).format("YYYY-MM-DD HH:mm:ss");;
}

export function convertIDR(number: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}