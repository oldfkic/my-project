"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface TextInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  type?: "text" | "number" | "email" | "password"
  min?: number
  max?: number
  required?: boolean
  disabled?: boolean
}

export default function TextInput({ 
  value = "", 
  onChange, 
  placeholder = "",
  label = "",
  type = "text",
  min,
  max,
  required = false,
  disabled = false
}: TextInputProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={label} className="px-1">
        {label}
      </Label>
      <Input
        id={label}
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        disabled={disabled}
        className="w-full"
      />
    </div>
  )
}
