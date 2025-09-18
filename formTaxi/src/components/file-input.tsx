"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface FileInputProps {
  onChange?: (files: File[]) => void
  label?: string
  accept?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
}

export default function FileInput({ 
  onChange, 
  label = "",
  accept = "*/*",
  multiple = false,
  required = false,
  disabled = false
}: FileInputProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onChange?.(Array.from(e.target.files))
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor={label} className="px-1">
        {label}
      </Label>
      <Input
        id={label}
        type="file"
        onChange={handleFileChange}
        accept={accept}
        multiple={multiple}
        required={required}
        disabled={disabled}
        className="w-full"
      />
    </div>
  )
}
