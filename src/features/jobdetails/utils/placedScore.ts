import type { AISummary, SalesPitch } from '../types';

/**
 * Calculate placedScore as the average of profileMatch and urgencyScore
 * Formula: placedScore = (profileMatch + urgencyScore) / 2
 */
export function calculatePlacedScore(profileMatch: number, urgencyScore: number): number {
  return Math.round((profileMatch + urgencyScore) / 2);
}

/**
 * Validate and fix AISummary data to ensure placedScore is correctly calculated
 */
export function validateAISummary(summary: AISummary): AISummary {
  const calculatedScore = calculatePlacedScore(summary.profileMatch, summary.urgencyScore);
  
  if (summary.placedScore !== calculatedScore) {
    console.warn(`PlacedScore mismatch detected. Expected: ${calculatedScore}, Got: ${summary.placedScore}. Auto-correcting...`);
    return {
      ...summary,
      placedScore: calculatedScore
    };
  }
  
  return summary;
}

/**
 * Validate and fix SalesPitch data to ensure placedScore is correctly calculated
 */
export function validateSalesPitch(pitch: SalesPitch): SalesPitch {
  if (pitch.profileMatch !== undefined && pitch.urgencyScore !== undefined) {
    const calculatedScore = calculatePlacedScore(pitch.profileMatch, pitch.urgencyScore);
    
    if (pitch.placedScore !== calculatedScore) {
      console.warn(`SalesPitch placedScore mismatch detected. Expected: ${calculatedScore}, Got: ${pitch.placedScore}. Auto-correcting...`);
      return {
        ...pitch,
        placedScore: calculatedScore
      };
    }
  }
  
  return pitch;
}
