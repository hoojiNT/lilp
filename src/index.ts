// Main entry point for lilp - Tử vi đẩu số calculation library

// Export all types and interfaces
export * from './types';

// Export utility functions  
export * from './utils';

// Export main calculation functions
export { TuViCalculator, calculateTuVi } from './calculator';

// Re-export key types for convenience
export type { 
  LunarDate, 
  TuViChart, 
  CungInfo, 
  CalculationOptions 
} from './types';

// Export main calculation function as default
export { calculateTuVi as default } from './calculator';

// Import for internal use
import { calculateTuVi } from './calculator';

/**
 * Convenience function to create a quick Tử vi calculation
 * @param day - Ngày âm lịch (1-30)
 * @param month - Tháng âm lịch (1-12)  
 * @param year - Năm âm lịch
 * @param hour - Giờ sinh (0-23)
 * @param gender - Giới tính ('male' | 'female')
 * @returns Complete Tử vi chart in JSON format
 */
export function quickCalculate(
  day: number,
  month: number, 
  year: number,
  hour: number,
  gender: 'male' | 'female'
) {
  const lunarDate = { day, month, year, hour, gender };
  return calculateTuVi(lunarDate);
}

/**
 * Library version and information
 */
export const LIBRARY_INFO = {
  name: 'lilp',
  version: '1.0.0',
  description: 'TypeScript library for calculating Tử vi đẩu số (Vietnamese astrology)',
  author: 'lilp',
  license: 'ISC'
} as const;