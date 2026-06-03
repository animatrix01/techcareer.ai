"use client";

import { useState, useRef, useEffect } from "react";
import { ALL_DEGREES, POPULAR_DEGREES } from "@/data/degrees";

interface DegreeAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  className?: string;
}

export function DegreeAutocomplete({
  value,
  onChange,
  placeholder = "e.g. Bachelor of Technology (B.Tech)",
  id = "degree-autocomplete",
  className = "",
}: DegreeAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredDegrees =
    value.trim().length > 0
      ? ALL_DEGREES.filter((d) =>
          d.toLowerCase().includes(value.toLowerCase())
        ).slice(0, 8)
      : POPULAR_DEGREES;

  useEffect(() => {
    setHighlightedIndex(0);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredDegrees.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredDegrees[highlightedIndex]) {
          onChange(filteredDegrees[highlightedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  const handleSelect = (degree: string) => {
    onChange(degree);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        className={`h-12 w-full border-slate-300 bg-white px-4 text-base text-slate-900 shadow-sm placeholder:text-slate-400 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 rounded-md ${className}`}
      />

      {isOpen && filteredDegrees.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50"
        >
          {value.trim().length === 0 && (
            <div className="border-b border-slate-100 px-3 py-2">
              <p className="text-xs font-semibold text-slate-500">
                POPULAR DEGREES
              </p>
            </div>
          )}
          <ul className="max-h-60 overflow-y-auto py-1">
            {filteredDegrees.map((degree, index) => (
              <li key={degree}>
                <button
                  type="button"
                  onClick={() => handleSelect(degree)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full px-4 py-2.5 text-left text-sm transition ${
                    index === highlightedIndex
                      ? "bg-indigo-50 text-indigo-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {degree}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
