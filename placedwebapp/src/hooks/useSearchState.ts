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
    // Simulate file validation
    if (!file || file.size === 0) {
      return { success: false, error: 'File is empty' };
    }
    
    if (file.name.endsWith('.txt')) {
      return { success: false, error: 'Text files are not supported' };
    }
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Mock success response
    return { 
      success: true, 
      fileId: `cv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` 
    };
  };

  // Handle CV upload flow
  const handleCVUpload = useCallback(async (file: File) => {
    try {
      const result = await parseCv(file);
      
      if (result.success && result.fileId) {
        // Create new search state
        const newSearchState = {
          fileId: result.fileId,
          cvFileName: file.name,
          timestamp: Date.now(),
        };
        
        // Update context state
        setSearchState(newSearchState);
        
        // Navigate to search page immediately
        const searchUrl = `/${lang}/search?fileId=${result.fileId}&cv=${encodeURIComponent(file.name)}`;
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
    
    // Stay on current page but remove search parameters from URL
    if (pathname.includes('/search') || pathname.includes('/job-details')) {
      // For search/job-details pages, remove search params from URL
      const cleanUrl = pathname;
      router.push(cleanUrl);
    }
    // For other pages, no URL change needed
  }, [clearSearchState, pathname, router]);

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