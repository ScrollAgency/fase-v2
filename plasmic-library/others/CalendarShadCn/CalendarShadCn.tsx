import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import { parseISO, addDays, isAfter, isBefore, isEqual } from "date-fns";
import { type DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { fr } from "date-fns/locale";

export interface CalendarShadCnProps {
	value?: { start: string; end: string };
	showDefaultDate?: boolean;
	onDateChange?: (value: { start: string; end: string } | null) => void;

	// Customisation
	selectedColor?: string;
	selectedTextColor?: string;
	rangeColor?: string;
	rangeTextColor?: string;
	disabledTextColor?: string;
	todayBorderColor?: string;
	todayTextColor?: string;
	monthLabelClass?: string;
	dayLabelClass?: string;
	navButtonClass?: string;
	showOutsideDays?: boolean;
	labelToday?: string;
	labelWeekend?: string;
	onTodayClick?: () => void;
	onWeekendClick?: () => void;
	showTodayButton?: boolean;
	showWeekendButton?: boolean;
	className?: string;
	innerRangeBackgroundColor?: string;
	innerRangeTextColor?: string;
}

function CalendarShadCn_(
	props: CalendarShadCnProps,
	ref: HTMLElementRefOf<"div">
) {
	const {
		value,
		showDefaultDate = false,
		onDateChange,
		selectedColor = "#000",
		selectedTextColor = "#fff",
		rangeColor = "#23242a",
		rangeTextColor = "#fff",
		disabledTextColor = "#d1d5db",
		todayBorderColor = "#000",
		todayTextColor = "#000",
		monthLabelClass = "text-center text-[18px] font-semibold",
		dayLabelClass = "",
		navButtonClass = "text-black hover:text-gray-800",
		showOutsideDays = false,
		labelToday = "Aujourd'hui",
		labelWeekend = "Ce week-end",
		onTodayClick,
		onWeekendClick,
		showTodayButton = true,
		showWeekendButton = true,
		className,
		innerRangeBackgroundColor,
		innerRangeTextColor,
	} = props;

	const defaultRange: DateRange | undefined =
		value?.start && value?.end
			? {
					from: parseISO(value.start),
					to: parseISO(value.end),
			  }
			: undefined;

	const [selectedRange, setSelectedRange] = React.useState<
		DateRange | undefined
	>(showDefaultDate ? defaultRange : undefined);

	const modifiers = React.useMemo(() => {
		if (!selectedRange?.from || !selectedRange?.to) return {};
		const from = new Date(selectedRange.from);
		const to = new Date(selectedRange.to);
		if (from.getTime() === to.getTime()) return {};
		const days = [];
		let d = addDays(from, 1);
		while (isBefore(d, to)) {
			days.push(new Date(d));
			d = addDays(d, 1);
		}
		return { range_middle: days };
	}, [selectedRange]);

	const modifiersClassNames = {
		selected: "calendar-selected",
		range_start: "calendar-range-start",
		range_end: "calendar-range-end",
		range_middle: "calendar-range-middle",
		today: "calendar-today",
		disabled: "calendar-disabled",
	};

	function handleSelect(range: DateRange | undefined) {
		setSelectedRange(range);
		if (range?.from && range.to) {
			onDateChange?.({
				start: range.from.toISOString().split("T")[0],
				end: range.to.toISOString().split("T")[0],
			});
		} else {
			onDateChange?.(null);
		}
	}

	const style = (
		<style>{`
      .calendar-range-start, .calendar-range-end {
        background: ${selectedColor} !important;
        color: ${selectedTextColor} !important;
        border-radius: 9999px !important;
        margin: 0 !important;
        padding: 0 !important;
        z-index: 2 !important;
        position: relative;
      }
      .calendar-range-middle {
        background: ${
					typeof innerRangeBackgroundColor === "string"
						? innerRangeBackgroundColor
						: rangeColor
				} !important;
        color: ${
					typeof innerRangeTextColor === "string"
						? innerRangeTextColor
						: rangeTextColor
				} !important;
        border-radius: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        z-index: 1 !important;
        position: relative;
        outline: 1px solid green !important; /* TEST: pour voir la zone */
      }
      .calendar-selected {
        background: ${rangeColor} !important;
        color: ${rangeTextColor} !important;
      }
      .calendar-today {
        border: 1.5px solid ${todayBorderColor} !important;
        color: ${todayTextColor} !important;
      }
      .calendar-disabled {
        color: ${disabledTextColor} !important;
      }
    `}</style>
	);

	return (
		<div ref={ref} className={className ?? "inline-block w-fit"}>
			{style}
			<DayPicker
				mode="range"
				selected={selectedRange}
				onSelect={handleSelect}
				numberOfMonths={1}
				fixedWeeks
				pagedNavigation
				locale={fr}
				showOutsideDays={showOutsideDays}
				disabled={{ before: new Date() }}
				modifiers={modifiers}
				modifiersClassNames={modifiersClassNames}
				classNames={{
					caption_label: monthLabelClass,
					nav_button: navButtonClass,
					day: dayLabelClass,
				}}
			/>
			<div className="flex flex-row justify-between mt-2 text-sm">
				{showTodayButton && (
					<button
						type="button"
						className="text-gray-500 hover:underline"
						onClick={onTodayClick}
					>
						{labelToday}
					</button>
				)}
				<div className="flex-1" />
				{showWeekendButton && (
					<button
						type="button"
						className="text-gray-500 hover:underline"
						onClick={onWeekendClick}
					>
						{labelWeekend}
					</button>
				)}
			</div>
		</div>
	);
}

const CalendarShadCn = React.forwardRef(CalendarShadCn_);
export default CalendarShadCn;
