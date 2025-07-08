import * as React from "react";
import type { HTMLElementRefOf } from "@plasmicapp/react-web";
import { parseISO, addDays, isBefore } from "date-fns";
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
		monthLabelClass = "items-center text-center text-black font-poppins text-[16px] not-italic font-semibold leading-6",
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
		//range_start: "calendar-range-start",
		range_end: "calendar-range-end",
		//range_middle: "calendar-range-middle",
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
			.rdp-root{
			  width:100%
			}
			.rdp-month_grid{
			   witdh:100%;
			}
			.rdp-day_button{
			font-size:16px !important;
			}
			.rdp-range_start{
				background: linear-gradient(90deg, transparent 50%, ${innerRangeBackgroundColor}  50%) !important;
			}
			.rdp-range_start .rdp-day_button{
				background:#000 !important;
			}
			.rdp-day_button{
				padding:20px;
			}
		
						

			.calendar-range-end .rdp-day_button{
				background:#000 !important;
				color:#fff;
			}

			.calendar-range-end {
				background: linear-gradient(-90deg, transparent 50%, ${innerRangeBackgroundColor}  50%) !important;
			}
			.rdp-range_middle{
			background:${innerRangeBackgroundColor} !important;
			color: ${
					typeof innerRangeTextColor === "string"
						? innerRangeTextColor
						: rangeTextColor
				} !important;
			}
		    .calendar-selected.calendar-range-end.rdp-range_start {
				background:linear-gradient(0deg, transparent 100%) !important;
			}
	/* .calendar-today {
        border: 1.5px solid ${todayBorderColor} !important;
        color: ${todayTextColor} !important;
      }*/
	.rdp-caption_label{
		align-items: center !important ;
		color: #000 !important;
		text-align: center !important;
		font-family: Poppins !important;
		font-size: 16px !important;
		font-style: normal !important;
		font-weight: 600 !important;
		line-height: 24px !important;
	}
	 .rdp-button_next svg{
	    width:16px;
		height:16px;
		fill : #000 !important;
		stroke-width: 0.5 !important;
	 }
		.rdp-button_previous svg{
		 width:16px;
		 height:16px;
		fill : #000 !important;
		stroke-width: 0.5 !important;
	 }
      
    `}</style>
	);

	return (
		<div ref={ref} className={className ?? "w-full overflow-x-hidden"}>
			{style}
			<DayPicker
				mode="range"
				selected={selectedRange}
				onSelect={handleSelect}
				numberOfMonths={1}
				navLayout="around"
				fixedWeeks
				animate
				pagedNavigation
				className="w-full"
				locale={fr}
				showOutsideDays={showOutsideDays}
				disabled={{ before: new Date() }}
				modifiers={modifiers}
				modifiersClassNames={modifiersClassNames}
				classNames={{
					/*caption_label: monthLabelClass,*/
					nav_button: navButtonClass,
					day: dayLabelClass,
				}}
			/>
			<div className="flex flex-row justify-between mt-2 text-sm">
				{showTodayButton && (
					<button
						type="button"
						className="font-medium text-[12px] leading-[18px] align-middle text-[#414651] hover:underline "
						onClick={onTodayClick}
					>
						{labelToday}
					</button>
				)}
				<div className="flex-1" />
				{showWeekendButton && (
					<button
						type="button"
						className="font-medium text-[12px] leading-[18px] align-middle text-[#414651] hover:underline"
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
