'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Simple placeholder for User type
type User = {
  id: string;
  email: string;
  avatar?: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: false,
});

export const useAuth = () => useContext(AuthContext);

// Simple placeholder provider that doesn't actually do authentication
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Placeholder values - in a real app these would be dynamic
  const authValues: AuthContextType = {
    user: null,
    isAuthenticated: false,
    loading: false,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
}; 