import React from 'react';

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  animate = true 
}) => {
  return (
    <div 
      className={`bg-gray-200 rounded ${animate ? 'animate-pulse' : ''} ${className}`}
    />
  );
};