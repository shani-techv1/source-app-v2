import React from "react";
import { X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface SelectedChipProps<T = string> {
  label: string;
  value: T;
  onRemove: (value: T) => void;
  className?: string;
}

export const SelectedChip = <T = string>({
  label,
  value,
  onRemove,
  className = "inline-flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded text-[0.75rem]"
}: SelectedChipProps<T>) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className={className}>
          <span className="truncate max-w-16">{label}</span>
          <div
            onClick={(e) => {
              e.stopPropagation();
              onRemove(value);
            }}
            className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </div>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}; 