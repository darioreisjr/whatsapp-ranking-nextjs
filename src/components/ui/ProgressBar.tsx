import React from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showLabel?: boolean;
  label?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  animated?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className = '',
  showLabel = true,
  label,
  variant = 'default',
  animated = true
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const variantClasses = {
    default: 'bg-blue-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500'
  };

  const bgClasses = {
    default: 'bg-blue-100',
    success: 'bg-green-100', 
    error: 'bg-red-100',
    warning: 'bg-yellow-100'
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            {label || 'Progresso'}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round(clampedProgress)}%
          </span>
        </div>
      )}
      
      <div className={`w-full h-3 ${bgClasses[variant]} rounded-full overflow-hidden relative`}>
        <div 
          className={`h-full ${variantClasses[variant]} rounded-full transition-all duration-300 ease-out ${
            animated ? 'animate-pulse' : ''
          } relative overflow-hidden`}
          style={{ width: `${clampedProgress}%` }}
        >
          {animated && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          )}
        </div>
      </div>
    </div>
  );
};
