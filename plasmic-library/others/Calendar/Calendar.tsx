"use client";
import * as React from "react";
import { DayPicker, DateRange, SelectRangeEventHandler, SelectSingleEventHandler } from "react-day-picker";
import { fr } from "date-fns/locale";
import { format, startOfToday, nextSaturday, nextSunday } from "date-fns";

export interface CalendarProps {
  mode?: "range" | "single";
  value?: { start?: string; end?: string } | { date?: string };
  onDateChange?: (value: { start?: string; end?: string } | { date?: string }) => void;
  className?: string;
}

export function Calendar({
  mode = "range",
  value,
  onDateChange,
  className,
}: CalendarProps) {
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>(
    mode === "range" && value && "start" in value && value.start && value.end
      ? {
          from: new Date(value.start),
          to: new Date(value.end),
        }
      : undefined
  );
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    mode === "single" && value && "date" in value && value.date ? new Date(value.date) : undefined
  );

  // Sélectionne aujourd'hui
  const handleToday = () => {
    if (mode === "range") {
      setSelectedRange({ from: startOfToday(), to: startOfToday() });
      onDateChange?.({ start: format(startOfToday(), "yyyy-MM-dd"), end: format(startOfToday(), "yyyy-MM-dd") });
    } else {
      setSelectedDate(startOfToday());
      onDateChange?.({ date: format(startOfToday(), "yyyy-MM-dd") });
    }
  };

  // Sélectionne le week-end prochain
  const handleWeekend = () => {
    const saturday = nextSaturday(startOfToday());
    const sunday = nextSunday(startOfToday());
    setSelectedRange({ from: saturday, to: sunday });
    onDateChange?.({ start: format(saturday, "yyyy-MM-dd"), end: format(sunday, "yyyy-MM-dd") });
  };

  // Gestion de la sélection
  const handleSelectRange: SelectRangeEventHandler = (range) => {
    setSelectedRange(range ?? undefined);
    if (range?.from && range.to) {
      onDateChange?.({ start: format(range.from, "yyyy-MM-dd"), end: format(range.to, "yyyy-MM-dd") });
    } else if (range?.from) {
      onDateChange?.({ start: format(range.from, "yyyy-MM-dd"), end: format(range.from, "yyyy-MM-dd") });
    }
  };
  const handleSelectSingle: SelectSingleEventHandler = (date) => {
    setSelectedDate(date ?? undefined);
    if (date) {
      onDateChange?.({ date: format(date, "yyyy-MM-dd") });
    }
  };

  return (
    <div className={`w-fit mx-auto flex flex-col items-center ${className ?? ""}`.trim()}>
      <DayPicker
        locale={fr}
        mode={mode}
        selected={mode === "range" ? selectedRange : selectedDate}
        onSelect={mode === "range" ? handleSelectRange : handleSelectSingle}
        showOutsideDays
        className="bg-white rounded-xl p-4 shadow-md"
        classNames={{
          months: "flex flex-col",
          month: "flex flex-col w-full gap-4",
          nav: "flex items-center justify-between mb-2",
          button_previous: "rounded-full p-1 hover:bg-gray-100",
          button_next: "rounded-full p-1 hover:bg-gray-100",
          month_caption: "text-center font-semibold text-base mb-2",
          weekdays: "flex justify-between text-xs text-gray-400 mb-1",
          weekday: "w-8 text-center",
          week: "flex w-full",
          day: "w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium cursor-pointer transition-colors duration-150",
          selected: "bg-black text-white",
          range_start: "bg-black text-white rounded-l-full",
          range_end: "bg-black text-white rounded-r-full",
          range_middle: "bg-gray-200 text-black",
          today: "border border-black",
          outside: "text-gray-300",
          disabled: "text-gray-200 cursor-not-allowed",
        }}
      />
      <div className="flex w-full justify-between mt-2 px-2 text-sm text-gray-500">
        <button type="button" className="hover:underline" onClick={handleToday}>
          Aujourd'hui
        </button>
        <button type="button" className="hover:underline" onClick={handleWeekend}>
          Ce week-end
        </button>
      </div>
    </div>
  );
}

export default Calendar;
