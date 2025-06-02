import React from 'react';
import { Skeleton } from './Skeleton';
import { SkeletonShimmer } from './SkeletonShimmer';

export const StatsHeaderSkeleton: React.FC = () => {
  return (
    <SkeletonShimmer className="bg-gradient-to-r from-gray-300 to-gray-400 p-6 rounded-t-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 rounded-lg bg-gray-400" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-48 bg-gray-400" />
            <Skeleton className="h-4 w-64 bg-gray-400" />
          </div>
        </div>
        <div className="text-right space-y-2">
          <Skeleton className="h-8 w-20 bg-gray-400 ml-auto" />
          <Skeleton className="h-4 w-32 bg-gray-400" />
        </div>
      </div>
    </SkeletonShimmer>
  );
};