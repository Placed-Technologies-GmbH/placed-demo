'use client';

import { motion } from 'framer-motion';
import { GlowEffect } from '@/components/ui/GlowEffect';


interface AISummaryLoadingCardProps {
  isGenerating: boolean;
}

export function AISummaryLoadingCard({ isGenerating }: AISummaryLoadingCardProps) {
  if (!isGenerating) return null;

  const loadingMessages = [
    "Analysiere Anforderungen...",
    "Verarbeite Kandidatenprofil...",
    "Generiere AI Insights...",
    "Finalisiere Zusammenfassung..."
  ];

  return (
    <div className="relative w-full max-w-[952px] h-[498px]">
      {/* Dynamic Glow Effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.2,
          ease: 'easeOut',
        }}
      >
        <GlowEffect
          colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
          mode="colorShift"
          blur="soft"
          duration={4}
          className="rounded-[6px]"
        />
      </motion.div>

      <motion.div 
        className="relative w-full h-full bg-white border border-border rounded-[6px] p-6 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center space-y-8">
        {/* AI Icon with Pulse Animation */}
        <motion.div
          className="relative"
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-16 h-16 text-black rounded-full flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth="2" 
              stroke="black" 
              className="w-8 h-8 font-bold text-black"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          
          {/* Pulse rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/30"
            animate={{ 
              scale: [1, 1.5, 2],
              opacity: [0.5, 0.2, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut"
            }}
          />
            <GlowEffect
            colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
            mode="colorShift"
            blur="medium"
            duration={4}
            />
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/20"
            animate={{ 
              scale: [1, 1.8, 2.5],
              opacity: [0.3, 0.1, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeOut",
              delay: 0.5
            }}
          />
        </motion.div>

        {/* Animated Loading Text */}
        <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-primary">Generiere AI Zusammenfassung</h3>
          
          {/* Cycling Loading Messages */}
          <motion.div
            className="h-6 flex items-center justify-center"
            key={Math.floor(Date.now() / 2000) % loadingMessages.length}
          >
            <motion.p
              className="text-sm text-text-secondary"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              {loadingMessages[Math.floor(Date.now() / 2000) % loadingMessages.length]}
            </motion.p>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}       
            />       
          ))}
        </div>
      </div>
    </motion.div>
    </div>
  );
} 