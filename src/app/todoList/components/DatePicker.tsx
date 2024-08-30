"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface DatePickerProps {
  selectedDate: Date | undefined; // Use `undefined` instead of `null` if needed
  onDateChange: (date: Date | undefined) => void;
}

export function DatePicker({ selectedDate, onDateChange }: DatePickerProps) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={cn("w-[280px] justify-between text-left font-normal flex", !selectedDate && "text-muted-foreground")}>
            {selectedDate ? format(selectedDate, "MM/dd/yyyy") : <span>Pick a date</span>}
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate} // Ensure this is correct according to Calendar API
            onSelect={onDateChange} // Ensure this is correct according to Calendar API
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
