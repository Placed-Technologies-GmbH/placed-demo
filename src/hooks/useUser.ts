'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchUserProfile, type UserProfile } from '@/lib/api/dashboardService';

export function useUser() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const profile = await fetchUserProfile();
        setUserProfile(profile);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch user profile');
        // Fallback to auth context user
        if (user?.email) {
          const emailPrefix = user.email.split('@')[0];
          setUserProfile({
            id: user.id || '1',
            email: user.email,
            displayName: emailPrefix.charAt(0).toUpperCase() + emailPrefix.slice(1),
          });
        } else {
          setUserProfile({
            id: '1',
            email: 'dev@example.com',
            displayName: 'Dev',
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  return {
    user,
    userProfile,
    displayName: userProfile?.displayName || 'Dev',
    isAuthenticated: !!user,
    loading,
    error,
  };
} 