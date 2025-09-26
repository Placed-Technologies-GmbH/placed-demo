'use client';

import { useAuth as useAuthContext } from '@/context/AuthContext';
import { useToast } from '@/context/ToastProvider';
import { useLoading } from '@/context/LoadingProvider';

export function useAuth() {
  const context = useAuthContext();
  const { success, error } = useToast();
  const { setLoading } = useLoading();

  // This would normally use Supabase auth functions
  // For now, we'll just provide placeholder functions with proper feedback
  const login = async (email: string, password: string) => {
    try {
      setLoading(true, 'Signing in...');
      // Placeholder for authentication logic
      if (process.env.NODE_ENV === 'development') {
        console.log('Login with:', email, password);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      success('Welcome back!', 'You have been signed in successfully.');
      return { success: true };
    } catch {
      error('Sign in failed', 'Please check your credentials and try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true, 'Signing out...');
      // Placeholder for logout logic
      if (process.env.NODE_ENV === 'development') {
        console.log('Logging out');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      success('Signed out', 'You have been signed out successfully.');
      return { success: true };
    } catch {
      error('Sign out failed', 'Please try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true, 'Sending reset email...');
      // Placeholder for password reset logic
      console.log('Reset password for:', email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      success('Reset email sent', 'Please check your inbox for password reset instructions.');
      return { success: true };
    } catch {
      error('Reset failed', 'Unable to send reset email. Please try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    user: context.user,
    isAuthenticated: context.isAuthenticated,
    loading: context.loading,
    login,
    logout,
    resetPassword,
  };
} 