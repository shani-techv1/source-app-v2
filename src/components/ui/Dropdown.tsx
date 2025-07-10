import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";

export interface DropdownOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

interface DropdownProps<T = string> {
  options: DropdownOption<T>[];
  value: T | T[] | null;
  onChange: (value: T | T[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  multiselect?: boolean;
  maxSelections?: number;
}

export function Dropdown<T = string>({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
  disabled = false,
  multiselect = false,
  maxSelections,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !(buttonRef.current && buttonRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Keyboard navigation (optional, basic)
  const [highlighted, setHighlighted] = useState<number>(-1);
  useEffect(() => {
    if (!open) setHighlighted(-1);
  }, [open, options]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    if (e.key === "ArrowDown") {
      setHighlighted(h => {
        let next = h + 1;
        while (next < options.length && options[next].disabled) {
          next++;
        }
        return Math.min(next, options.length - 1);
      });
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlighted(h => {
        let prev = h - 1;
        while (prev >= 0 && options[prev].disabled) {
          prev--;
        }
        return Math.max(prev, 0);
      });
      e.preventDefault();
    } else if (e.key === "Enter" && highlighted >= 0 && !options[highlighted].disabled) {
      handleOptionSelect(options[highlighted].value);
      e.preventDefault();
    } else if (e.key === "Escape") {
      setOpen(false);
      e.preventDefault();
    }
  }

  // Position the dropdown menu using the button's bounding box
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const menuHeight = Math.min(240, options.length * 60); // max 240px height
      const spaceBelow = viewportHeight - rect.bottom;
      const spaceAbove = rect.top;
      
      // Determine if dropdown should open above or below
      const shouldOpenAbove = spaceBelow < menuHeight && spaceAbove > spaceBelow;
      
      setMenuStyles({
        position: "absolute",
        top: shouldOpenAbove 
          ? rect.top + window.scrollY - menuHeight 
          : rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [open, options.length]);

  const handleOptionSelect = (selectedValue: T) => {
    if (multiselect) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.includes(selectedValue);
      
      if (isSelected) {
        // Remove from selection
        const newValues = currentValues.filter(v => v !== selectedValue);
        onChange(newValues);
      } else {
        // Add to selection (check max limit)
        if (!maxSelections || currentValues.length < maxSelections) {
          const newValues = [...currentValues, selectedValue];
          onChange(newValues);
        }
      }
    } else {
      // Single select
      onChange(selectedValue);
      setOpen(false);
    }
  };

  const removeSelection = (valueToRemove: T) => {
    if (multiselect && Array.isArray(value)) {
      const newValues = value.filter(v => v !== valueToRemove);
      onChange(newValues);
    }
  };

  const isSelected = (optionValue: T) => {
    if (multiselect) {
      return Array.isArray(value) && value.includes(optionValue);
    } else {
      return value === optionValue;
    }
  };

  const getDisplayText = () => {
    if (multiselect) {
      const selectedValues = Array.isArray(value) ? value : [];
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        const selected = options.find(opt => opt.value === selectedValues[0]);
        return selected ? selected.label : placeholder;
      }
      return `${selectedValues.length} items selected`;
    } else {
      const selected = options.find(opt => opt.value === value);
      return selected ? selected.label : placeholder;
    }
  };

  // The dropdown menu rendered in a portal
  const menu = open
    ? createPortal(
        <div
          style={{
            ...menuStyles,
            maxHeight: '240px',
            overflowY: 'auto',
            overflowX: 'hidden',
            WebkitOverflowScrolling: 'touch'
          }}
          className="bg-white border border-gray-200 rounded-xl shadow-lg custom-scrollbar animate-fade-in"
          onWheel={(e) => {
            // Prevent the wheel event from bubbling up
            e.stopPropagation();
          }}
        >
          <div className="py-1">
            {options.map((opt, i) => (
              <div
                key={String(opt.value)}
                role="option"
                aria-selected={isSelected(opt.value)}
                tabIndex={-1}
                className={`px-4 py-3 select-none text-xs flex items-center justify-between transition-colors ${
                  opt.disabled 
                    ? "opacity-50 cursor-not-allowed text-gray-400" 
                    : "cursor-pointer hover:bg-gray-50"
                } ${isSelected(opt.value) ? "bg-gray-100" : ""} ${highlighted === i && !opt.disabled ? "bg-gray-200" : ""}`}
                onMouseEnter={() => !opt.disabled && setHighlighted(i)}
                onMouseLeave={() => setHighlighted(-1)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  if (!opt.disabled) {
                    handleOptionSelect(opt.value);
                  }
                }}
              >
                <span className="flex-1">{opt.label}</span>
                {multiselect && isSelected(opt.value) && (
                  <div className="w-4 h-4 bg-black rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <div ref={ref} className={`relative w-full ${className}`} tabIndex={-1}>
      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        className={`w-full  text-left border border-gray-300 rounded-lg px-4 py-3 text-base bg-white focus:outline-none focus:border-black focus:border-[1.5px] transition-all flex items-center justify-between ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer"} ${open ? "border-black border-[1.5px]" : ""}`}
        onClick={() => setOpen(o => !o)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          {multiselect && Array.isArray(value) && value.length > 0 ? (
            <div className="flex overflow-auto  gap-1">
                             {value.slice(0, 2).map((selectedValue) => {
                 const selected = options.find(opt => opt.value === selectedValue);
                return (
                  <span
                    key={String(selectedValue)}
                    className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-sm"
                  >
                    <span className="truncate max-w-20">{selected?.label}</span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelection(selectedValue);
                      }}
                      className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </div>
                  </span>
                );
              })}
              {value.length > 2 && (
                <span className="text-gray-500 text-sm">+{value.length - 2} more</span>
              )}
            </div>
          ) : (
            <span className={getDisplayText() !== placeholder ? "text-black" : "text-gray-400"}>
              {getDisplayText()}
            </span>
          )}
        </div>
        <ChevronDown className={`ml-2 h-5 w-5 text-gray-500 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
      </button>
      {menu}
    </div>
  );
}