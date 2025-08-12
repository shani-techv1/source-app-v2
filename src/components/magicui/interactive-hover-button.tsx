import React from "react";
import { ArrowDownLeft, ArrowRight } from "lucide-react";
import { cn } from "@/hooks/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-6 text-center font-semibold",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center text-center gap-2">
        <div className="h-2 w-2 rounded-full bg-primary transition-all duration-300 group-hover:scale-[100.8]"></div>
        <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 tracking-tighter text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowDownLeft className="h-4 w-4"/>
      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export const DarkHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tigher",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-center text-center gap-2">
        <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:-translate-x-20 md:group-hover:-translate-x-10"></div>
        <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 tracking-wider text-primary-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <ArrowDownLeft className="h-4 w-4"/>
      </div>
    </button>
  );
});

DarkHoverButton.displayName = "DarkButton";
