"use client"

import * as React from "react"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface TextareaInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  rows?: number
  required?: boolean
  disabled?: boolean
}

export default function TextareaInput({ 
  value = "", 
  onChange, 
  placeholder = "",
  label = "",
  rows = 4,
  required = false,
  disabled = false
}: TextareaInputProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={label} className="px-1">
        {label}
      </Label>
      <Textarea
        id={label}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        required={required}
        disabled={disabled}
        className="w-full"
      />
    </div>
  )
}
