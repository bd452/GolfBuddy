/**
 * Input component - shared UI input
 * TODO: Replace with shadcn/ui input or expand as needed
 */
import { InputHTMLAttributes, forwardRef } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-zinc-800 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
