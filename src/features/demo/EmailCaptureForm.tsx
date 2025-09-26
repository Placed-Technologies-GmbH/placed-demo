'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useDemo } from '@/hooks/useDemo';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Logo from '@/components/ui/Logo';

// Form schema with zod validation
const demoFormSchema = z.object({
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
});

type DemoFormValues = z.infer<typeof demoFormSchema>;

interface EmailCaptureFormProps {
  dict: {
    title: string;
    companyName: string;
    emailAddress: string;
    tryForFree: string;
    companyPlaceholder: string;
    emailPlaceholder: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
  };
}

export function EmailCaptureForm({ dict }: EmailCaptureFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const { isLoading, error: apiError, signupForDemo } = useDemo();
  
  const {
    register,
    handleSubmit,
  } = useForm<DemoFormValues>({
    resolver: zodResolver(demoFormSchema),
  });

  const onSubmit = async (data: DemoFormValues) => {
    const result = await signupForDemo(data);
    if (result.success) {
      setIsSuccess(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto ">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-[500px] h-[450px] bg-surface rounded-lg shadow-md p-8"
      >
        <div className="flex justify-center mb-6">
          <Logo />
        </div>
        
        {!isSuccess ? (
          <>
            <h1 className="text-2xl font-grotesk font-medium text-center text-text-primary mb-6">
              {dict.title}
            </h1>
            
            {apiError && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-error/10 text-error p-3 rounded-md mb-4 text-text-xs"
              >
                {dict.errorMessage}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company">{dict.companyName}</Label>
                <Input
                  id="company"
                  type="text"
                  placeholder={dict.companyPlaceholder}
                  {...register('company')}
                  className="border-border"
                />

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{dict.emailAddress}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={dict.emailPlaceholder}
                  {...register('email')}
                  className="border-border"
                />
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
                    {dict.tryForFree}
                  </div>
                ) : (
                  dict.tryForFree
                )}
              </Button>
            </form>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-6"
          >
            <svg 
              className="w-16 h-16 text-success mx-auto mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-display-sm font-grotesk font-bold text-text-primary mb-2">
              {dict.successTitle}
            </h2>
            <p className="text-text-secondary">
              {dict.successMessage}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
} 