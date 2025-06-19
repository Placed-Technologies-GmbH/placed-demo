'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  loadingMessage: string;
  setLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  loadingMessage: '',
  setLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const setLoading = (loading: boolean, message: string = 'Loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        loadingMessage,
        setLoading,
      }}
    >
      {children}
      {isLoading && (
        <div className="fixed inset-0 z-modal bg-surface-overlay flex items-center justify-center">
          <div className="bg-surface rounded-lg shadow-modal p-6 mx-4 max-w-sm w-full text-center">
            <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-primary font-medium">{loadingMessage}</p>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
} 