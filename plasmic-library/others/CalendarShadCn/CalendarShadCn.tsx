import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import { addDays, parseISO } from "date-fns";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr } from "date-fns/locale"

export interface CalendarShadCnProps {
  value?: { start: string; end: string };
  showDefaultDate?: boolean;
  onDateChange?: (value: { start: string; end: string } | null) => void;
  
  selectedClass?: string;
  rangeStartClass?: string;
  rangeEndClass?: string;
  todayClass?: string;
  disabledClass?: string;

  monthCaptionClass?: string;
  navButtonClass?: string;

  className?: string;
}

function CalendarShadCn_(
  props: CalendarShadCnProps,
  ref: HTMLElementRefOf<"div">
) {
  const { 
    value, 
    showDefaultDate = false, 
    onDateChange,

    selectedClass = "bg-blue-600 text-white",
    rangeStartClass = "rounded-l-md bg-blue-700 text-white",
    rangeEndClass = "rounded-r-md bg-blue-700 text-white",
    todayClass = "text-blue-600 border border-blue-600",
    disabledClass = "text-gray-400",

    monthCaptionClass = "flex-row flex-wrap content-center justify-normal items-normal w-[250px] text-center text-lg font-semibold",
    navButtonClass = "text-blue-600 hover:text-blue-800",

    className 
  } = props;

  // Parse la plage de dates initiale
  const defaultRange: DateRange | undefined =
    value?.start && value?.end
      ? {
          from: parseISO(value.start),
          to: parseISO(value.end),
        }
      : undefined;

  // État local pour la sélection
  const [selectedRange, setSelectedRange] = React.useState<DateRange | undefined>(
    showDefaultDate ? defaultRange : undefined
  );

  // Gère la sélection
  function handleSelect(range: DateRange | undefined) {
    const formatDate = (date: Date) => date.toLocaleDateString("sv-SE");
    setSelectedRange(range);
    if (range?.from && range.to) {
      onDateChange?.({
        start: formatDate(range.from),
  end: formatDate(range.to),
      });
    } else {
      onDateChange?.(null);
    }
  }

  return (
    <div ref={ref} className={className ?? "inline-block"}>
      <DayPicker
        mode="range"
        selected={selectedRange}
        onSelect={handleSelect}
        numberOfMonths={1}
        fixedWeeks
        disabled={{ before: new Date() }}
        pagedNavigation
        locale={fr}
        modifiersClassNames={{
          selected: selectedClass,
          range_start: rangeStartClass,
          range_end: rangeEndClass,
          today: todayClass,
          disabled: disabledClass,
        }}

        classNames={{
          caption_label: monthCaptionClass,
          nav_button: navButtonClass,
        }}
      />
    </div>
  );
}

const CalendarShadCn = React.forwardRef(CalendarShadCn_);
export default CalendarShadCn;
