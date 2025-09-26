'use client';

import React, { useRef, useState } from 'react';
// import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { Paperclip, MapPin, X } from 'lucide-react';
import { useSearchState } from '@/hooks/useSearchState';
import { usePathname } from 'next/navigation';

export function NavSearchbar() {
  const {
    isActiveSearch,
    handleCVUpload,
    handleManualSearch,
    handleClear,
    getSearchSummaryText,
  } = useSearchState();
  
  const pathname = usePathname();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  // Determine if we should show active state
  const isSearchOrJobDetails = pathname.includes('/search') || pathname.includes('/job-details');
  const showActiveState = isActiveSearch && isSearchOrJobDetails;

  // Handle CV upload icon click
  const handleCVIconClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleCVUpload(file);
    }
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (keyword.trim() || location.trim()) {
      handleManualSearch(keyword.trim() || undefined, location.trim() || undefined);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

    // Active State (Search Context Visible)
  if (showActiveState) {
    const summaryText = getSearchSummaryText();
    
    return (
      <div className="py-2 inline-flex justify-start items-center gap-4 overflow-hidden">
        {/* Search Summary Text */}
        <div className="w-96 h-10 px-3 py-3 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input inline-flex justify-start items-start">
          <span className="justify-center text-Primary-Brand text-sm font-normal font-inter truncate">
            {summaryText}
          </span>
        </div>
        
        {/* Clear Button */}
        <div className="h-10 px-6 py-3 bg-slate-900 rounded-3xl flex justify-center items-center overflow-hidden">
          <button
            onClick={handleClear}
            className="justify-start text-white text-base font-normal font-inter hover:opacity-80 transition-fast focus:outline-none flex items-center gap-2 hover:cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    );
  }

  // Default State (Clean Slate)
  return (
    <div className="py-2 inline-flex justify-start items-center gap-4 overflow-hidden">
      {/* CV Upload Section */}
      <div className="w-36 pl-10 py-0.5 flex justify-start items-center gap-2 overflow-hidden">

        {/* CV Upload Button */}
        <button
          type="button"
          aria-label="Upload CV"
          className="w-full h-[24px] flex justify-center items-center gap-2 relative overflow-hidden hover:opacity-80 transition-fast focus:outline-none text-text-secondary text-sm font-normal font-inter hover:cursor-pointer"
          onClick={handleCVIconClick}
        >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.35288 8.95043C4.00437 6.17301 6.17301 4.00437 8.95043 3.35288C10.9563 2.88237 13.0437 2.88237 15.0496 3.35288C17.827 4.00437 19.9956 6.17301 20.6471 8.95044C21.1176 10.9563 21.1176 13.0437 20.6471 15.0496C19.9956 17.827 17.827 19.9956 15.0496 20.6471C13.0437 21.1176 10.9563 21.1176 8.95044 20.6471C6.17301 19.9956 4.00437 17.827 3.35288 15.0496C2.88237 13.0437 2.88237 10.9563 3.35288 8.95043Z" stroke="#363853" strokeWidth="1.5"/>
            <path d="M14.5 12H9.5M12 14.5L12 9.5" stroke="#363853" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        CV-Suche
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        </button>
      </div>

      {/* Title/Skill Input */}
      <div className="w-52 h-10 max-w-80 px-3 py-3 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-start">
        <Input
          type="text"
          placeholder="Job, Skill, Firma"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-full border-0 focus:ring-0 focus:outline-none bg-transparent text-sm placeholder:text-muted-foreground font-inter p-0"
        />
      </div>

      {/* Location Input */}
      <div className="w-44 h-10 max-w-80 px-3 py-3 bg-background rounded-md outline outline-1 outline-offset-[-1px] outline-input flex justify-start items-start">
        <Input
          type="text"
          placeholder="Ort"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          className="w-full h-full border-0 focus:ring-0 focus:outline-none bg-transparent text-sm placeholder:text-muted-foreground font-inter p-0"
        />
      </div>

      {/* Search Button */}
      <div className="h-10 px-6 py-3 bg-slate-900 rounded-3xl flex justify-center items-center overflow-hidden">
        <button
          onClick={handleSearchClick}
          disabled={!keyword.trim() && !location.trim()}
          className="justify-start text-text-inverse text-base font-normal hover:opacity-80 font-inter transition-fast focus:outline-none hover:cursor-pointer"
        >
          Suchen
        </button>
      </div>
    </div>
  );
} 