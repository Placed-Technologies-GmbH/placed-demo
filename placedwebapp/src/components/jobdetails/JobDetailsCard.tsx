'use client';

import type { JobDetails } from '@/features/jobdetails/types';

interface JobDetailsCardProps {
  jobDetails: JobDetails;
}

export function JobDetailsCard({ jobDetails }: JobDetailsCardProps) {
  return (
    <div className="w-full max-w-[952px] h-[712px] bg-white border border-border rounded-[6px] p-6">
      {/* Scrollable Content */}
      <div className="h-full overflow-y-auto space-y-8 pr-2">
        {/* Responsibilities Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-secondary">
            Responsibilities
          </h2>
          <div className="space-y-1">
            {jobDetails.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-1 h-1 bg-primary rounded-full mt-2" />
                <p className="text-sm text-text-primary leading-relaxed">
                  {responsibility}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Your Profile Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-secondary">
            Your Profile
          </h2>
          <div className="space-y-1">
            {jobDetails.yourProfile.map((requirement, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-1 h-1 bg-primary rounded-full mt-2" />
                <p className="text-sm text-text-primary leading-relaxed">
                  {requirement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-text-secondary">
            Benefits
          </h2>
          <div className="space-y-1">
            {jobDetails.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-shrink-0 w-1 h-1 bg-primary rounded-full mt-2" />
                <p className="text-sm text-text-primary leading-relaxed">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Description Section (if available) */}
        {jobDetails.fullDescription && (
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-text-secondary">
              Job Description
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
                {jobDetails.fullDescription}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 