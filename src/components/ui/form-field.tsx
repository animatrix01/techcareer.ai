"use client";

import { Input } from "./input";
import { Label } from "./label";
import { Textarea } from "./textarea";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  type?: "text" | "email" | "tel" | "url" | "textarea";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
  rows?: number;
}

export function FormField({
  label,
  name,
  error,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
  required,
  className,
  rows = 4,
}: FormFieldProps) {
  const hasError = !!error;
  const inputId = `field-${name}`;

  const inputClassName = cn(
    "h-12 border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors",
    hasError && "border-red-500 focus:border-red-500 focus:ring-red-500",
    className
  );

  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId} className="text-slate-700 flex items-center gap-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </Label>
      
      {type === "textarea" ? (
        <Textarea
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={rows}
          className={cn(
            "min-h-32 resize-y border-slate-300 bg-white p-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 transition-colors",
            hasError && "border-red-500 focus:border-red-500 focus:ring-red-500"
          )}
        />
      ) : (
        <Input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={inputClassName}
        />
      )}

      {hasError && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 animate-in fade-in slide-in-from-top-1 duration-200">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
