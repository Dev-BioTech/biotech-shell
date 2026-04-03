import React from "react";
import { motion } from "framer-motion";

const SkeletonItem = ({ className }) => (
  <div className={`bg-gray-200 dark:bg-gray-700 animate-pulse rounded-xl ${className}`} />
);

export const ModuleSkeleton = () => {
  return (
    <div className="flex flex-col gap-6 p-6 w-full animate-in fade-in duration-500">
      {/* Hero Banner Skeleton */}
      <div className="relative h-48 md:h-56 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200/50 via-gray-100/50 to-gray-200/50 animate-shimmer" 
             style={{ backgroundSize: '200% 100%' }} />
        <div className="relative z-10 w-full px-10 flex flex-col gap-4">
          <SkeletonItem className="h-10 w-1/3" />
          <SkeletonItem className="h-6 w-1/2 opacity-60" />
        </div>
      </div>

      {/* KPI Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <SkeletonItem className="h-10 w-10" />
              <SkeletonItem className="h-4 w-12" />
            </div>
            <SkeletonItem className="h-7 w-2/3" />
          </div>
        ))}
      </div>

      {/* Content Area Skeleton */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <SkeletonItem className="h-8 w-1/4" />
          <div className="flex gap-2">
            <SkeletonItem className="h-10 w-24" />
            <SkeletonItem className="h-10 w-10" />
          </div>
        </div>
        
        {/* Table/List Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-4 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0">
              <SkeletonItem className="h-12 w-12 shrink-0" />
              <div className="flex-1 space-y-2 text-left">
                <SkeletonItem className="h-4 w-1/3" />
                <SkeletonItem className="h-3 w-1/4 opacity-60" />
              </div>
              <SkeletonItem className="h-8 w-20 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}} />
    </div>
  );
};

export default ModuleSkeleton;
