import React from 'react';
import { Skeleton } from './Skeleton';
import { SkeletonShimmer } from './SkeletonShimmer';

interface RankingSkeletonProps {
  count?: number;
}

export const RankingSkeleton: React.FC<RankingSkeletonProps> = ({ count = 10 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonShimmer 
          key={index}
          className="bg-gray-50 rounded-lg p-4 border border-gray-100"
        >
          <div className="flex items-center gap-4">
            {/* Position/Trophy */}
            <Skeleton className="w-10 h-10 rounded-full" />
            
            {/* Content */}
            <div className="flex-1 space-y-3">
              {/* Name and count */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="flex items-center gap-3">
                <Skeleton className="h-2 flex-1 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </div>
        </SkeletonShimmer>
      ))}
    </div>
  );
};
