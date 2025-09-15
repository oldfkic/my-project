"use client"

import * as React from "react"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface TimePickerProps {
  value?: string
  onChange?: (time: string) => void
  placeholder?: string
  label?: string
}

export default function TimePicker({ 
  value = "", 
  onChange, 
  placeholder = "Выберите время",
  label = "Время отправления"
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedTime, setSelectedTime] = React.useState(value)
  const [selectedHour, setSelectedHour] = React.useState("")
  const [selectedMinute, setSelectedMinute] = React.useState("")

  // Инициализируем выбранные час и минуту из value
  React.useEffect(() => {
    if (value && value.includes(':')) {
      const [hour, minute] = value.split(':')
      setSelectedHour(hour)
      setSelectedMinute(minute)
    }
  }, [value])

  // Генерируем часы (00-23)
  const hours = Array.from({ length: 24 }, (_, i) => 
    i.toString().padStart(2, '0')
  )

  // Генерируем минуты (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => 
    i.toString().padStart(2, '0')
  )

  const handleHourSelect = (hour: string) => {
    setSelectedHour(hour)
    if (selectedMinute) {
      const timeString = `${hour}:${selectedMinute}`
      setSelectedTime(timeString)
      onChange?.(timeString)
    }
  }

  const handleMinuteSelect = (minute: string) => {
    setSelectedMinute(minute)
    if (selectedHour) {
      const timeString = `${selectedHour}:${minute}`
      setSelectedTime(timeString)
      onChange?.(timeString)
      setOpen(false)
    }
  }

  const formatDisplayTime = (time: string) => {
    if (!time) return placeholder
    return time
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <Label htmlFor="time" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="time"
            className="w-full justify-between font-normal"
          >
            {formatDisplayTime(selectedTime)}
            <Clock className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <div className="p-1 w-xs">
            <div className="flex gap-1 max-h-64">
              {/* Список часов */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-muted-foreground px-2 py-1.5">Часы</div>
                <div className="max-h-48 overflow-y-auto">
                  {hours.map((hour) => {
                    const isSelected = selectedHour === hour
                    return (
                      <button
                        key={hour}
                        onClick={() => handleHourSelect(hour)}
                        className={`relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
                          isSelected ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        {hour}
                      </button>
                    )
                  })}
                </div>
              </div>
              
              {/* Список минут */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-muted-foreground px-2 py-1.5">Минуты</div>
                <div className="max-h-48 overflow-y-auto">
                  {minutes.map((minute) => {
                    const isSelected = selectedMinute === minute
                    return (
                      <button
                        key={minute}
                        onClick={() => handleMinuteSelect(minute)}
                        className={`relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground ${
                          isSelected ? 'bg-accent text-accent-foreground' : ''
                        }`}
                      >
                        {minute}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
