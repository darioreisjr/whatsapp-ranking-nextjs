import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'secondary';
  className?: string;
  icon?: LucideIcon;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  icon
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const variantClasses = {
    default: 'text-gray-500',
    primary: 'text-blue-500',
    secondary: 'text-green-500'
  };

  const SpinnerIcon = icon;

  if (SpinnerIcon) {
    return (
      <SpinnerIcon 
        className={`${sizeClasses[size]} ${variantClasses[variant]} animate-spin ${className}`}
      />
    );
  }

  return (
    <div 
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
    >
      <svg 
        className="animate-spin w-full h-full" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};
