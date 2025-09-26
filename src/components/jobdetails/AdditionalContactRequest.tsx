'use client';

import { Phone, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

type AdditionalContactRequestProps = {
  creditsLeft?: number;
  onRequestContact?: () => void;
  className?: string;
  hasError?: boolean;
  isLoading?: boolean;
  dict: {
    contactNotWorking: string;
    additionalContactDescription: string;
    noCompanyFound: string;
    requestAdditionalContact: string;
    creditsLeft: string;
  };
};

const AdditionalContactRequest = ({
  creditsLeft = 100,
  onRequestContact,
  className = '',
  hasError = false,
  isLoading = false,
  dict,
}: AdditionalContactRequestProps) => {


  return (
    <div className={`bg-neutral-50 border border-neutral-200 rounded-lg p-4 ${className}`}>
      <div className="flex flex-col items-start gap-4">
        <div className="flex items-center gap-2">
          <Phone className="text-neutral-900 h-4 w-4" />
          <div className="text-sm text-neutral-900 font-medium">
            {dict.contactNotWorking}
          </div>
        </div>
        <div className="text-neutral-600 text-sm">
          {dict.additionalContactDescription}
        </div>
        {hasError ? (
          <div className="text-red-600 text-sm font-medium">
            {dict.noCompanyFound}
          </div>
        ) : (
          <>
            <Button
              variant="outline"
              size="default"
              onClick={onRequestContact}
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? "Wird geladen..." : dict.requestAdditionalContact}
            </Button>
            <div className="flex items-center gap-2">
              <Info className="text-neutral-500 h-4 w-4" />
              <div className="text-neutral-500 text-sm font-semibold">
                {creditsLeft} {dict.creditsLeft}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdditionalContactRequest;
