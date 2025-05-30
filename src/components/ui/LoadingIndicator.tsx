import React from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';

interface LoadingIndicatorProps {
  type?: 'processing' | 'loading';
  message?: string;
}

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  type = 'processing', 
  message = 'Processando...' 
}) => {
  const Icon = type === 'processing' ? BarChart3 : RefreshCw;
  
  return (
    <div className="flex items-center justify-center py-4">
      <Icon className="w-6 h-6 text-blue-500 animate-pulse mr-2" />
      <span className="text-gray-600">{message}</span>
    </div>
  );
};
