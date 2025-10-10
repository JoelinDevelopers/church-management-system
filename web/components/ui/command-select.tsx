"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Check, Search } from "lucide-react"
import { cn } from "@/lib/utils"

interface Option {
  code?: string
  value?: string
  name?: string
  label?: string
}

interface CommandSelectProps {
  options: Option[]
  value: string
  onValueChange: (value: string) => void
  placeholder: string
  searchPlaceholder: string
  className?: string
  error?: boolean
  disabled?: boolean
  loading?: boolean
  openUpwards?: boolean
}

export const CommandSelect: React.FC<CommandSelectProps> = ({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  className = "",
  error = false,
  disabled = false,
  loading = false,
  openUpwards = false,
}) => {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")

  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options

    return options.filter((option) => {
      const searchableText = option.name || option.label || ""
      return searchableText.toLowerCase().includes(search.toLowerCase())
    })
  }, [options, search])

  const selectedOption = useMemo(() => {
    return options.find((option) => (option.code || option.value || option.name) === value)
  }, [options, value])

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue)
    setOpen(false)
    setSearch("")
  }

  const displayText = useMemo(() => {
    if (loading) return "Loading..."
    if (selectedOption) return selectedOption.name || selectedOption.label
    return placeholder
  }, [loading, selectedOption, placeholder])

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => !disabled && !loading && setOpen(!open)}
        disabled={disabled || loading}
        className={cn(
          "w-full flex items-center justify-between px-3 py-2 border-2 rounded-lg focus:outline-none bg-white transition-colors text-sm",
          error ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-blue-500",
          (disabled || loading) && "bg-gray-50 cursor-not-allowed",
          !selectedOption && !loading && "text-gray-400",
        )}
      >
        <span className={cn(loading && "text-gray-400", selectedOption && !loading && "text-gray-900")}>
          {displayText}
        </span>
        <svg
          className={cn(
            "h-4 w-4 text-gray-500 transition-transform flex-shrink-0 stroke-2",
            open && "rotate-180",
            (disabled || loading) && "opacity-50",
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && !disabled && !loading && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className={cn(
              "absolute z-50 w-full bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden",
              openUpwards ? "bottom-full mb-1" : "top-full mt-1",
            )}
          >
            <div className="p-2 border-b border-gray-100 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {filteredOptions.length === 0 ? (
                <div className="p-3 text-sm text-gray-500 text-center">No results found</div>
              ) : (
                filteredOptions.map((option, index) => {
                  const optionValue = option.code || option.value || option.name || ""
                  const optionLabel = option.name || option.label || ""
                  const isSelected = value === optionValue

                  return (
                    <button
                      key={`${optionValue}-${index}`}
                      type="button"
                      onClick={() => handleSelect(optionValue)}
                      className={cn(
                        "w-full text-left px-3 py-2.5 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none flex items-center justify-between transition-colors",
                        isSelected && "bg-blue-50 text-blue-600",
                      )}
                    >
                      <span className={cn("text-gray-900", isSelected && "font-medium text-blue-600")}>
                        {optionLabel}
                      </span>
                      {isSelected && <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />}
                    </button>
                  )
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
