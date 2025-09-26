"use client";
import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar({ dict }: { dict: { searchPlaceholder: string; search: string; dropResume: string } }) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleIconClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    // handle file drop logic here
  };

  return (
    <div
      className={`w-full mx-auto bg-surface rounded-lg shadow-md flex flex-col sm:flex-row items-center 
                  px-3 sm:px-4 py-3 sm:py-2 mb-4 border transition-normal
                  ${isDragging ? 'border-brand-lime bg-brand-lime/50' : 'border-border-light'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex w-full items-center">
        <button
          type="button"
          aria-label="Attach resume"
          className="mr-2 flex items-center justify-center text-interactive-muted hover:text-primary focus:outline-none transition-fast"
          onClick={handleIconClick}
          tabIndex={0}
          style={{ border: 'none', background: 'none', padding: 0 }}
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M21.44 11.05l-8.49 8.49a5.25 5.25 0 01-7.43-7.43l8.49-8.49a3.75 3.75 0 015.3 5.3l-8.5 8.5a2.25 2.25 0 01-3.18-3.18l7.8-7.8" />
          </svg>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.txt"
          />
        </button>
        <Input
          type="text"
          placeholder={dict.searchPlaceholder}
          className="flex-1 bg-transparent  outline-none text-text-md border-none shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <Button
        variant="cta"
        className="mt-2 sm:mt-0 ml-0 sm:ml-2 font-semibold hover:bg-cta-hover rounded-full w-full sm:w-auto"
        onClick={() => {}}
      >
        {dict.search}
      </Button>
      
      {/* Drop area hint - shows only when dragging */}
      {isDragging && (
        <div className="absolute inset-0 bg-brand-lime/80 rounded-xl flex items-center justify-center pointer-events-none">
          <p className="text-accent font-medium">{dict.dropResume}</p>
        </div>
      )}
    </div>
  );
}