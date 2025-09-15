"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  options?: SelectOption[]
  required?: boolean
  disabled?: boolean
}

export default function SelectInput({ 
  value = "", 
  onChange, 
  placeholder = "Выберите опцию",
  label = "",
  options = [],
  required = false,
  disabled = false
}: SelectInputProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={label} className="px-1">
        {label}
      </Label>
      <Select value={value} onValueChange={onChange} required={required} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
