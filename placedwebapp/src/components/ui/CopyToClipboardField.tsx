import { useState } from 'react';

interface CopyToClipboardFieldProps {
  label?: string | React.ReactNode;
  className?: string;
  copiedMessage?: string;
}

export function CopyToClipboardField({ label, className = '', copiedMessage = 'Copied!' }: CopyToClipboardFieldProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!label) return;
    try {
      await navigator.clipboard.writeText(String(label));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  if (!label) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopy}
        className={`cursor-pointer bg-transparent border-none p-0 m-0 text-left focus:outline-none ${className}`}
        aria-label="Copy to clipboard"
      >
        {label}
      </button>
      {copied && (
        <span className="text-xs text-success font-medium animate-fade-in">{copiedMessage}</span>
      )}
    </div>
  );
} 