import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';

interface LoadingStateProps {
  state: 'loading' | 'success' | 'error' | 'warning';
  message: string;
  description?: string;
  className?: string;
  showIcon?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  state,
  message,
  description,
  className = '',
  showIcon = true
}) => {
  const stateConfig = {
    loading: {
      icon: LoadingSpinner,
      iconProps: { variant: 'primary' as const, size: 'lg' as const },
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      descColor: 'text-blue-600'
    },
    success: {
      icon: CheckCircle,
      iconProps: { className: 'w-6 h-6 text-green-600' },
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      descColor: 'text-green-600'
    },
    error: {
      icon: XCircle,
      iconProps: { className: 'w-6 h-6 text-red-600' },
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      descColor: 'text-red-600'
    },
    warning: {
      icon: AlertCircle,
      iconProps: { className: 'w-6 h-6 text-yellow-600' },
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      descColor: 'text-yellow-600'
    }
  };

  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className={`
      ${config.bgColor} 
      ${config.borderColor} 
      border rounded-lg p-4 
      ${className}
    `}>
      <div className="flex items-center gap-3">
        {showIcon && (
          <div className="flex-shrink-0">
            <Icon {...config.iconProps} />
          </div>
        )}
        
        <div className="flex-1">
          <p className={`font-medium ${config.textColor}`}>
            {message}
          </p>
          {description && (
            <p className={`text-sm mt-1 ${config.descColor}`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};