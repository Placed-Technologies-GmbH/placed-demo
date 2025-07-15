'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GlowEffect } from '@/components/ui/GlowEffect';
import { MetricsChart } from './MetricsChart';
import type { AISummary } from '@/features/jobdetails/types';

interface AISummaryCardProps {
  aiSummary: AISummary;
  dict: {
    aiSummary: {
      title: string;
      placedScore: string;
      profileMatch: string;
      urgencyScore: string;
      whatsGood: string;
      whatsBad: string;
      whatsMissing: string;
      generatedOn: string;
      feedback: {
        question: string;
        thumbsUp: string;
        thumbsDown: string;
      };
    };
  };
}

type FeedbackType = 'positive' | 'negative' | null;

export function AISummaryCard({ aiSummary, dict }: AISummaryCardProps) {
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const handleFeedback = async (type: FeedbackType) => {
    if (isSubmittingFeedback) return;

    setIsSubmittingFeedback(true);
    
    try {
      // Toggle feedback - if same type is clicked, remove feedback
      const newFeedback = feedback === type ? null : type;
      setFeedback(newFeedback);

      // Submit feedback to API
      await submitFeedback(aiSummary.id, newFeedback);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      // Revert feedback state on error
      setFeedback(feedback);
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  const submitFeedback = async (summaryId: string, feedbackType: FeedbackType) => {
    // TODO: Replace with actual FastAPI backend endpoint
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/ai-summary/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        summaryId,
        feedback: feedbackType,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }

    return response.json();
  };

  return (
    <div className="relative w-full max-w-[952px] h-[498px]">
      {/* Dynamic Glow Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        <GlowEffect
          colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
          mode="colorShift"
          blur="medium"
          duration={4}
          className="rounded-[6px]"
        />
      </motion.div>

      <motion.div 
        className="relative w-full h-full bg-white border border-border rounded-[6px] p-6 space-y-2 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
      {/* Scrollable Content */}
      <div className="relative z-10 h-full overflow-y-auto space-y-8 pr-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-primary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            <span className="text-sm text-text-secondary">{dict.aiSummary.title}</span>
          </div>
          
          {/* Feedback Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-secondary mr-2">{dict.aiSummary.feedback.question}</span>
            
            {/* Thumbs Up Button */}
            <button 
              aria-label="Thumbs up - positive feedback"
              className={`p-2 rounded-lg transition-all duration-200 ${
                feedback === 'positive'
                  ? 'bg-success/10 text-success border border-success'
                  : 'text-text-secondary hover:text-success hover:bg-success/5 border border-transparent'
              } ${isSubmittingFeedback ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => handleFeedback('positive')}
              disabled={isSubmittingFeedback}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={feedback === 'positive' ? 'currentColor' : 'none'} 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
              </svg>
            </button>

            {/* Thumbs Down Button */}
            <button 
              aria-label="Thumbs down - negative feedback"
              className={`p-2 rounded-lg transition-all duration-200 ${
                feedback === 'negative'
                  ? 'bg-destructive/10 text-destructive border border-destructive'
                  : 'text-text-secondary hover:text-destructive hover:bg-destructive/5 border border-transparent'
              } ${isSubmittingFeedback ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => handleFeedback('negative')}
              disabled={isSubmittingFeedback}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={feedback === 'negative' ? 'currentColor' : 'none'} 
                viewBox="0 0 24 24" 
                strokeWidth="1.5" 
                stroke="currentColor" 
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" />
              </svg>
            </button>
          </div>
        </div>  

        {/* Metrics Section */}
        <div className="flex items-center gap-8 mb-6">
          <MetricsChart
            value={aiSummary.placedScore}
            label={dict.aiSummary.placedScore}
            color="#78C2FF"
          />
          <MetricsChart
            value={aiSummary.profileMatch}
            label={dict.aiSummary.profileMatch}
            color="#57E4A0"
          />
          <MetricsChart
            value={aiSummary.urgencyScore}
            label={dict.aiSummary.urgencyScore}
            color="#FF8A65"
          />
        </div>

        {/* Content Section - Scrollable */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-2">
          {/* Why the candidate fits this position */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-secondary">
              {dict.aiSummary.whatsGood}
            </h3>
            <div className="space-y-4">
              {aiSummary.whatsGood.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-primary-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What is Bad */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-secondary">
              {dict.aiSummary.whatsBad}
            </h3>
            <div className="space-y-4">
              {aiSummary.whatsBad.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-warning rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-warning-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What is missing */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-text-secondary">
              {dict.aiSummary.whatsMissing}
            </h3>
            <div className="space-y-4">
              {aiSummary.whatsMissing.map((point, index) => (
                <div key={index} className="flex gap-2">
                  <div className="flex-shrink-0 w-6 h-6 bg-warning rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-xs font-medium text-warning-foreground">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-sm text-text-primary leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generated timestamp */}
        {aiSummary.generatedAt && (
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-text-secondary">
              {dict.aiSummary.generatedOn} {new Date(aiSummary.generatedAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </motion.div>
    </div>
  );
} 