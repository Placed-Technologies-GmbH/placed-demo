'use client';

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface SearchState {
  keyword?: string;
  location?: string;
  fileId?: string;
  cvFileName?: string;
  timestamp: number;
}

interface SearchContextType {
  searchState: SearchState | null;
  setSearchState: (state: SearchState | null) => void;
  clearSearchState: () => void;
  isActiveSearch: boolean;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const STORAGE_KEY = 'placed_search_context';
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

    // Return null if no search parameters
    if (!keyword && !location && !fileId) {
      return null;
    }

    return {
      keyword,
      location,
      fileId,
      cvFileName,
      timestamp: Date.now(),
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

  // Initialize and update search state based on current page
  useEffect(() => {
    if (isSearchOrJobDetails) {
      // URL parameters as source of truth for search/job-details pages
      const urlState = parseURLSearchParams();
      setSearchStateInternal(urlState);
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
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
} 