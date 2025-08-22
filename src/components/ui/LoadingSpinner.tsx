import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-slate-600 border-t-purple-500 ${sizeClasses[size]} ${className}`}
    />
  );
}

export function LoadingCard() {
  return (
    <div className='bg-slate-800 rounded-xl overflow-hidden animate-pulse'>
      <div className='w-full h-48 sm:h-64 bg-slate-700' />
      <div className='p-4'>
        <div className='h-4 bg-slate-700 rounded mb-2' />
        <div className='h-3 bg-slate-700 rounded w-2/3 mb-3' />
        <div className='flex gap-1 mb-3'>
          <div className='h-5 bg-slate-700 rounded w-12' />
          <div className='h-5 bg-slate-700 rounded w-16' />
        </div>
        <div className='flex justify-between'>
          <div className='h-3 bg-slate-700 rounded w-16' />
          <div className='h-3 bg-slate-700 rounded w-20' />
        </div>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className='min-h-screen bg-slate-900 flex items-center justify-center'>
      <div className='text-center'>
        <LoadingSpinner size='lg' className='mx-auto mb-4' />
        <p className='text-slate-400'>Loading...</p>
      </div>
    </div>
  );
}

export { LoadingSpinner };
