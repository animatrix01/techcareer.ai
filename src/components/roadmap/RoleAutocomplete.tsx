"use client";

import { useState, useRef, useEffect } from "react";
import { ALL_ROLES, POPULAR_ROLES } from "@/data/roles";

interface RoleAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
}

export function RoleAutocomplete({
  value,
  onChange,
  placeholder = "e.g. Senior Frontend Engineer",
  id = "role-autocomplete",
}: RoleAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter roles based on input
  const filteredRoles = value.trim().length > 0
    ? ALL_ROLES.filter((role) =>
        role.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 8) // Limit to 8 suggestions
    : POPULAR_ROLES; // Show popular roles when empty

  // Reset highlighted index when filtered roles change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [value]);

  // Close dropdown when clicking outside
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

  // Handle keyboard navigation
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
          prev < filteredRoles.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        e.preventDefault();
        if (filteredRoles[highlightedIndex]) {
          onChange(filteredRoles[highlightedIndex]);
          setIsOpen(false);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
    }
  };

  // Handle role selection
  const handleSelectRole = (role: string) => {
    onChange(role);
    setIsOpen(false);
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
        className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200"
        autoComplete="off"
      />

      {isOpen && filteredRoles.length > 0 && (
        <>
          {/* Subtle backdrop to indicate overlay */}
          <div className="fixed inset-0 z-[99]" onClick={() => setIsOpen(false)} />
          
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 z-[100] mt-2 animate-in fade-in-0 slide-in-from-top-2 duration-200 rounded-xl border border-indigo-200/80 bg-white shadow-2xl shadow-indigo-900/10 ring-1 ring-black/5"
          >
            {value.trim().length === 0 && (
              <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Popular Roles
                </p>
              </div>
            )}
            <ul className="max-h-[280px] overflow-y-auto py-1.5">
              {filteredRoles.map((role, index) => (
                <li key={role}>
                  <button
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSelectRole(role);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`w-full px-4 py-2.5 text-left text-sm transition-all duration-150 ${
                      index === highlightedIndex
                        ? "bg-indigo-50 text-indigo-900 font-semibold"
                        : "text-slate-700 hover:bg-slate-50/80"
                    }`}
                  >
                    {role}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
