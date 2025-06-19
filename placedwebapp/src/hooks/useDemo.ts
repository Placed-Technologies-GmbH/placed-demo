'use client';

import { useState } from 'react';
import { useToast } from '@/context/ToastProvider';
import { useLoading } from '@/context/LoadingProvider';

interface DemoSignupData {
  company: string;
  email: string;
}

export function useDemo() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { success: showSuccess, error: showError } = useToast();
  const { setLoading } = useLoading();

  const signupForDemo = async (data: DemoSignupData) => {
    setLoading(true, 'Signing up for demo...');
    setError(null);
    setSuccess(false);

    try {
      // This would normally call an API endpoint
      // For now, just simulate a delay and success
      // const response = await axios.post('/api/demo-signup', data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      if (process.env.NODE_ENV === 'development') {
        console.log('Demo signup data:', data);
      }
      setSuccess(true);
      showSuccess(
        'Demo signup successful!', 
        'We will contact you soon to schedule your demo.'
      );
      return { success: true };
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Demo signup error:', err);
      }
      const errorMessage = 'An error occurred while signing up. Please try again.';
      setError(errorMessage);
      showError('Demo signup failed', errorMessage);
      return { success: false, error: 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading: false, // Now managed by LoadingProvider
    error,
    success,
    signupForDemo,
  };
} 