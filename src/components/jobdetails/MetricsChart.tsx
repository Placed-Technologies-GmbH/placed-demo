'use client';

interface MetricsChartProps {
  value: number;
  label: string;
  color: string;
}

export function MetricsChart({ value, label, color }: MetricsChartProps) {
  // Calculate the stroke-dasharray for the circle progress
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      {/* Radial Chart */}
      <div className="relative w-12 h-12">
        <svg
          className="w-12 h-12 transform -rotate-90"
          viewBox="0 0 48 48"
        >
          {/* Background circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#E5E7EB"
            strokeWidth="4"
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-semibold text-text-primary">
            {value}%
          </span>
        </div>
      </div>
      
      {/* Label */}
      <span className="text-sm font-medium text-text-primary text-center">
        {label}
      </span>
    </div>
  );
} 