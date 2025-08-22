import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import Button from "./Button";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorMessage({ message, onRetry, className = "" }: ErrorMessageProps) {
  return (
    <div className={`text-center py-8 ${className}`}>
      <AlertCircle className='w-12 h-12 text-red-500 mx-auto mb-4' />
      <h3 className='text-white text-lg font-medium mb-2'>Something went wrong</h3>
      <p className='text-slate-400 mb-4'>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant='ghost' className='flex items-center space-x-2 mx-auto'>
          <RefreshCw className='w-4 h-4' />
          <span>Try Again</span>
        </Button>
      )}
    </div>
  );
}
