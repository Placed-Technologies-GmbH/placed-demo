// Re-export all hooks for cleaner imports
export { useAuth } from './useAuth';
export { useDemo } from './useDemo';

// Re-export provider hooks for convenience
export { useToast } from '@/context/ToastProvider';
export { useLoading } from '@/context/LoadingProvider';
export { useAuth as useAuthContext } from '@/context/AuthContext'; 