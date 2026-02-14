import { AcademicLevel } from './types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateLevel = (dobString: string): AcademicLevel => {
  if (!dobString) return AcademicLevel.UNKNOWN;
  
  const dob = new Date(dobString);
  const today = new Date();
  
  // Calculate age in years
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  if (age >= 3 && age < 4) return AcademicLevel.LEVEL_1;
  if (age >= 4 && age < 5) return AcademicLevel.LEVEL_2;
  if (age >= 5 && age < 7) return AcademicLevel.LEVEL_3; // extended to < 7 for flexibility

  return AcademicLevel.UNKNOWN;
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
  }).format(amount);
};