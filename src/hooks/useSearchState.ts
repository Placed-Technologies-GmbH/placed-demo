'use client';

import { useCallback } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { useSearchContext } from '@/context/SearchContext';

interface UseSearchStateReturn {
  // State
  searchState: {
    keyword?: string;
    location?: string;
    fileId?: string;
    cvFileName?: string;
  } | null;
  isActiveSearch: boolean;
  
  // Actions
  handleCVUpload: (file: File) => Promise<void>;
  handleManualSearch: (keyword?: string, location?: string) => void;
  handleClear: () => void;
  
  // Helpers
  getSearchSummaryText: () => string;
}

export function useSearchState(): UseSearchStateReturn {
  const { searchState, setSearchState, clearSearchState, isActiveSearch } = useSearchContext();
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const lang = params?.lang || 'en';

  // Mock CV parsing function (replace with real API later)
  const parseCv = async (file: File): Promise<{ success: boolean; fileId?: string; error?: string }> => {
    // Use the MockDataManager for consistent CV parsing
    const { default: MockDataManager } = await import('@/lib/data/mockDataManager');
    const mockDataManager = MockDataManager.getInstance();
    
    const result = await mockDataManager.parseCVFile(file);
    
    return {
      success: result.success,
      fileId: result.fileId,
      error: result.error
    };
  };

  // Handle CV upload flow
  const handleCVUpload = useCallback(async (file: File) => {
    try {
      const result = await parseCv(file);
      
      if (result.success && result.fileId) {
        // Generate unique upload ID for this upload
        const cvUploadId = `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Create new search state with upload tracking
        const newSearchState = {
          fileId: result.fileId,
          cvFileName: file.name,
          timestamp: Date.now(),
          cvUploadId, // Track this specific upload
          uploadTimestamp: Date.now(), // When upload happened
        };
        
        // Update context state
        setSearchState(newSearchState);
        
        // Navigate to search page immediately (preserve existing flow)
        const searchUrl = `/${lang}/search?fileId=${result.fileId}&cv=${encodeURIComponent(file.name)}&uploadId=${cvUploadId}`;
        router.push(searchUrl);
      } else {
        // Navigate to search page anyway, error will be handled there
        const searchUrl = `/${lang}/search?error=cv_upload_failed`;
        router.push(searchUrl);
      }
    } catch {
      // Navigate to search page with error parameter
      const searchUrl = `/${lang}/search?error=cv_upload_failed`;
      router.push(searchUrl);
    }
  }, [setSearchState, router, lang]);

  // Handle manual search flow
  const handleManualSearch = useCallback((keyword?: string, location?: string) => {
    if (!keyword && !location) return;
    
    // Create new search state
    const newSearchState = {
      keyword,
      location,
      timestamp: Date.now(),
    };
    
    // Update context state
    setSearchState(newSearchState);
    
    // Build search URL
    const urlParams = new URLSearchParams();
    if (keyword) urlParams.set('q', keyword);
    if (location) urlParams.set('location', location);
    
    const searchUrl = `/${lang}/search?${urlParams.toString()}`;
    router.push(searchUrl);
  }, [setSearchState, router, lang]);

  // Handle clear action
  const handleClear = useCallback(() => {
    // Clear context state and localStorage
    clearSearchState();
    
    // Navigate based on current page
    if (pathname.includes('/search')) {
      // For search page, remove search params from URL
      const cleanUrl = pathname.split('?')[0];
      router.push(cleanUrl);
    } else if (pathname.includes('/job-details')) {
      // For job-details page, go back to dashboard since clearing search context
      router.push(`/${lang}/dashboard`);
    }
    // For other pages, no URL change needed
  }, [clearSearchState, pathname, router, lang]);

  // Generate search summary text for active state
  const getSearchSummaryText = useCallback((): string => {
    if (!searchState) return '';
    
    const { keyword, location, fileId, cvFileName } = searchState;
    
    // CV search case
    if (fileId && cvFileName) {
      // Extract candidate name from filename (remove extension)
      const candidateName = cvFileName.replace(/\.(pdf|doc|docx)$/i, '');
      return `Jobs matched for CV of ${candidateName}`;
    }
    
    // Manual search cases
    if (keyword && location) {
      return `${keyword} in ${location}`;
    }
    
    if (keyword) {
      return keyword;
    }
    
    if (location) {
      return location;
    }
    
    return '';
  }, [searchState]);

  return {
    searchState,
    isActiveSearch,
    handleCVUpload,
    handleManualSearch,
    handleClear,
    getSearchSummaryText,
  };
} 