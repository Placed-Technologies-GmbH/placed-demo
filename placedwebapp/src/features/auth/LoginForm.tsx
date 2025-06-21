'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/ui/Logo';
import { useParams, useRouter } from 'next/navigation';

// Form schema with zod validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Incorrect email or password'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  dict: {
    signIn: string;
    email: string;
    password: string;
    logIn: string;
    forgotPassword: string;
    termsText: string;
    termsLink: string;
    emailPlaceholder: string;
  };
}

export function LoginForm({ dict }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const { lang } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError('');
    await login(data.email, data.password);
    router.push(`/${lang}/dashboard`);
      
    try {
      // Use the login function from useAuth hook
      console.log('Login successful:', data);
      // Redirect would happen here
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-background-primary border-medium rounded-lg p-4">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[500px] h-[450px] bg-surface rounded-lg shadow-md p-8"
      >
        <div className="flex justify-center mb-6 pt-8">
          <Logo />
        </div>
        
        <h1 className="text-xl font-grotesk font-medium text-center text-text-navy mb-6 h-[20px]">
          {dict.signIn}
        </h1>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-error/10 text-error p-3 rounded-md mb-4 text-text-xs"
          >
            {error}
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">{dict.email}</Label>
            <Input
              id="email"
              type="email"
              placeholder={dict.emailPlaceholder}
              {...register('email')}
              className={errors.email ? 'border-error' : ''}
            />

          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{dict.password}</Label>
              <Link 
                href="#" 
                className="text-xs text-cta-hover hover:text-cta-hover hover:underline transition-fast"
              >
                {dict.forgotPassword}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register('password')}
              className={errors.password ? 'border-error' : ''}
            />
            {errors.password && (
              <p className="text-error text-xs font-light h-[18px] mt-6">{errors.password.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            variant="default"
            className="w-full rounded-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-text-inverse" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {dict.logIn}
              </div>
            ) : (
              dict.logIn
            )}
          </Button>
        </form>
      </motion.div>
      
      <p className="text-xs text-center text-text-muted mt-6">
        {dict.termsText} <Link href="#" className="text-cta-hover hover:text-cta-hover hover:underline transition-fast">{dict.termsLink}</Link>.
      </p>
    </div>
  );
} 