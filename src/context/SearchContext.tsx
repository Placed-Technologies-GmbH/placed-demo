'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface SearchState {
  keyword?: string;
  location?: string;
  fileId?: string;
  cvFileName?: string;
  timestamp: number;
  cvUploadId?: string; // Unique ID for each CV upload
  uploadTimestamp?: number; // When CV was actually uploaded
}

interface SearchContextType {
  searchState: SearchState | null;
  setSearchState: (state: SearchState | null) => void;
  clearSearchState: () => void;
  isActiveSearch: boolean;
  shouldShowCvAnimation: (searchState: SearchState | null) => boolean;
  markAnimationAsShown: (uploadId: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const STORAGE_KEY = 'placed_search_context';
const ANIMATION_STORAGE_KEY = 'placed_cv_animations_shown';
const EXPIRATION_TIME = 5 * 60 * 60 * 1000; // 5 hours in milliseconds

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchState, setSearchStateInternal] = useState<SearchState | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Check if current page is search or job-details
  const isSearchOrJobDetails = pathname.includes('/search') || pathname.includes('/job-details');

  // Get valid search context from localStorage (with expiration check)
  const getValidSearchContext = useCallback((): SearchState | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return null;
      
      const parsed: SearchState = JSON.parse(stored);
      const now = Date.now();
      
      // Check if expired (5 hours)
      if (now - parsed.timestamp > EXPIRATION_TIME) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      
      return parsed;
    } catch {
      // Handle corrupted localStorage data
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
  }, []);

  // Parse URL search parameters
  const parseURLSearchParams = useCallback((): SearchState | null => {
    const keyword = searchParams.get('q') || searchParams.get('keyword') || undefined;
    const location = searchParams.get('location') || undefined;
    const fileId = searchParams.get('fileId') || undefined;
    const cvFileName = searchParams.get('cv') || undefined;
    const cvUploadId = searchParams.get('uploadId') || undefined;

    // Return null if no search parameters
    if (!keyword && !location && !fileId) {
      return null;
    }

    return {
      keyword,
      location,
      fileId,
      cvFileName,
      cvUploadId,
      timestamp: Date.now(),
      // Only set uploadTimestamp if we have uploadId (indicating fresh upload)
      uploadTimestamp: cvUploadId ? Date.now() : undefined,
    };
  }, [searchParams]);

  // Set search state with localStorage persistence
  const setSearchState = (state: SearchState | null) => {
    setSearchStateInternal(state);
    
    if (typeof window === 'undefined') return;
    
    if (state) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        // Handle localStorage errors (incognito mode, storage full, etc.)
        console.warn('Failed to save search state to localStorage:', error);
      }
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Clear search state
  const clearSearchState = () => {
    setSearchState(null);
  };

  // Helper to check if animation was already shown for this upload
  const hasShownAnimationForUpload = useCallback((uploadId: string): boolean => {
    if (typeof window === 'undefined') return false;
    try {
      const shownAnimations = JSON.parse(localStorage.getItem(ANIMATION_STORAGE_KEY) || '[]');
      return shownAnimations.includes(uploadId);
    } catch {
      return false;
    }
  }, []);

  // Helper to mark animation as shown
  const markAnimationAsShown = useCallback((uploadId: string) => {
    if (typeof window === 'undefined') return;
    try {
      const shownAnimations = JSON.parse(localStorage.getItem(ANIMATION_STORAGE_KEY) || '[]');
      if (!shownAnimations.includes(uploadId)) {
        shownAnimations.push(uploadId);
        localStorage.setItem(ANIMATION_STORAGE_KEY, JSON.stringify(shownAnimations));
      }
    } catch (error) {
      console.warn('Failed to mark animation as shown:', error);
    }
  }, []);

  // Helper to determine if this is a fresh upload that should show animation
  const shouldShowCvAnimation = useCallback((searchState: SearchState | null): boolean => {
    if (!searchState?.fileId || !searchState.cvUploadId) return false;
    
    // Check if animation was already shown for this upload
    if (hasShownAnimationForUpload(searchState.cvUploadId)) return false;
    
    // Check if this is a recent upload (within last 30 seconds)
    const now = Date.now();
    const uploadTime = searchState.uploadTimestamp || searchState.timestamp;
    const timeSinceUpload = now - uploadTime;
    const isRecentUpload = timeSinceUpload < 30000; // 30 seconds
    
    return isRecentUpload;
  }, [hasShownAnimationForUpload]);

  // Initialize and update search state based on current page
  useEffect(() => {
    if (isSearchOrJobDetails) {
      // URL parameters as source of truth for search/job-details pages
      const urlState = parseURLSearchParams();
      setSearchStateInternal(urlState);
      
      // Also update localStorage to keep it in sync if we have URL state
      if (urlState && typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(urlState));
        } catch (error) {
          console.warn('Failed to sync search state to localStorage:', error);
        }
      }
    } else {
      // Context/localStorage as source of truth for other pages
      const contextState = getValidSearchContext();
      setSearchStateInternal(contextState);
    }
  }, [pathname, searchParams, isSearchOrJobDetails, parseURLSearchParams, getValidSearchContext]);

  // Determine if there's an active search
  const isActiveSearch = Boolean(searchState && (searchState.keyword || searchState.location || searchState.fileId));

  const value: SearchContextType = {
    searchState,
    setSearchState,
    clearSearchState,
    isActiveSearch,
    shouldShowCvAnimation,
    markAnimationAsShown,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
} 