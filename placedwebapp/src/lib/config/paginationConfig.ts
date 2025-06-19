/**
 * Pagination Configuration
 * 
 * Centralized configuration for pagination settings across the application.
 * This allows for easy updates without modifying multiple files.
 */

export const PAGINATION_CONFIG = {
  // Items per page for different screen sizes
  DESKTOP_ITEMS_PER_PAGE: 25,
  MOBILE_ITEMS_PER_PAGE: 15,
  
  // Maximum items per page (for future API limits)
  MAX_ITEMS_PER_PAGE: 100,
  
  // Default page number
  DEFAULT_PAGE: 1,
  
  // Pagination display settings
  SHOW_PAGINATION_WHEN_TOTAL_PAGES_GT: 1,
  MAX_VISIBLE_PAGE_BUTTONS: 5,
} as const;

/**
 * Get items per page based on screen width
 * @param isMobile - Whether the current screen is mobile
 * @returns Number of items to display per page
 */
export function getItemsPerPage(isMobile: boolean): number {
  return isMobile ? PAGINATION_CONFIG.MOBILE_ITEMS_PER_PAGE : PAGINATION_CONFIG.DESKTOP_ITEMS_PER_PAGE;
}

/**
 * Validate and clamp items per page to allowed range
 * @param itemsPerPage - Requested items per page
 * @returns Clamped items per page within allowed range
 */
export function validateItemsPerPage(itemsPerPage: number): number {
  return Math.min(Math.max(itemsPerPage, 1), PAGINATION_CONFIG.MAX_ITEMS_PER_PAGE);
} 