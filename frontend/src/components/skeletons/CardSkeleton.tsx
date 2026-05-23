import React from 'react';

export const CardSkeleton = () => {
  return (
    <div className="border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-xl overflow-hidden animate-pulse flex flex-col h-full">
      <div className="h-48 bg-gray-200 dark:bg-gray-800"></div>
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-auto"></div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};
