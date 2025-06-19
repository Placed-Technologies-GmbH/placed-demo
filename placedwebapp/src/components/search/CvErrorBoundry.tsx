import { X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import React from 'react';

interface CvErrorBoundaryProps {
  onTryAnotherFile?: () => void;
  message?: string;
}

export function CvErrorBoundary({ onTryAnotherFile, message }: CvErrorBoundaryProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center bg-white border border-border rounded-[8px] p-[25px] gap-4 w-[425px] h-[212px] shadow-lg"
      style={{ minWidth: 320, maxWidth: 425, minHeight: 180, maxHeight: 212 }}
    >
      {/* Close Icon (optional, can be added if you want a dismiss action) */}
      <button className="absolute top-4 right-4 p-1 rounded hover:bg-muted" aria-label="Close">
        <X className="w-4 h-4 text-muted-foreground" />
      </button> 
      <AlertTriangle className="w-4 h-4 text-error mb-2" />
      <div className="flex flex-col items-center gap-3 text-center">
        <h2 className="text-lg font-semibold text-error mb-1">This CV can&apos;st be processed</h2>
        <p className="text-sm text-muted-foreground max-w-[340px]">
          {message || "It does&apos;snt look like a valid or readable CV.\nPlease upload a clear PDF or DOCX file."}
        </p>
      </div>
      <Button
        className="mt-4 h-10 w-full max-w-[200px] rounded-[6px] text-base font-medium"
        variant="default"
        onClick={onTryAnotherFile}
      >
        Try another file
      </Button>
    </div>
  );
} 