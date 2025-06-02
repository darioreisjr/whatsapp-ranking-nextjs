import React from 'react';

interface SkeletonShimmerProps {
  className?: string;
  children?: React.ReactNode;
}

export const SkeletonShimmer: React.FC<SkeletonShimmerProps> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      {children}
    </div>
  );
};
