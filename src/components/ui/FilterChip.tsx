import React from "react";
import { X } from "lucide-react";

interface FilterChipProps {
  label: string;
  onRemove: () => void;
  color?: "purple" | "blue" | "green" | "yellow" | "red";
}

export default function FilterChip({ label, onRemove, color = "purple" }: FilterChipProps) {
  const colorClasses = {
    purple: "bg-purple-600 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    yellow: "bg-yellow-600 text-white",
    red: "bg-red-600 text-white",
  };

  return (
    <span
      className={`${colorClasses[color]} text-sm px-3 py-1 rounded-full flex items-center space-x-2 transition-all hover:opacity-80`}
    >
      <span>{label}</span>
      <button onClick={onRemove} className='hover:bg-white/20 rounded-full p-0.5 transition-colors'>
        <X className='w-3 h-3' />
      </button>
    </span>
  );
}
