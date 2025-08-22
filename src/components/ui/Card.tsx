import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({ children, className = '', onClick }: CardProps) {
  return (
    <div 
      className={`bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-slate-750' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
