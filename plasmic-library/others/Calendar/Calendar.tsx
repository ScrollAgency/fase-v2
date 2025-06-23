import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import { RangeCalendar } from "@heroui/react";
import { today, parseDate, type CalendarDate, getLocalTimeZone } from "@internationalized/date";

export interface CalendarProps {
  value?: { start: string; end: string };
  showDefaultDate?: boolean;
  onDateChange?: (value: { start: string; end: string } | null) => void;
}

function Calendar_(props: CalendarProps, ref: HTMLElementRefOf<"div">) {
  const { value, showDefaultDate = false, onDateChange } = props;

  const parsedStart = value?.start ? parseDate(value.start) : undefined;
  const parsedEnd = value?.end ? parseDate(value.end) : undefined;

  const defaultValue =
    showDefaultDate && parsedStart && parsedEnd
      ? { start: parsedStart, end: parsedEnd }
      : undefined;

  const [selectedRange, setSelectedRange] = React.useState<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>(defaultValue ?? null);

  const handleChange = (
    val: { start: CalendarDate; end: CalendarDate } | null
  ) => {
    setSelectedRange(val);
    if (val) {
      onDateChange?.({
        start: val.start.toString(),
        end: val.end.toString(),
      });
    } else {
      onDateChange?.(null);
    }
  };

  return (
    <div className="flex gap-x-4">
      <RangeCalendar
        aria-label="Date Picker"
        minValue={today(getLocalTimeZone())}
        value={selectedRange ?? undefined}
        onChange={handleChange}
        {...(defaultValue ? { defaultValue } : {})}
      />
    </div>
  );
}

const Calendar = React.forwardRef(Calendar_);
export default Calendar;
