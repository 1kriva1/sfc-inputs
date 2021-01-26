import { formatDate, WeekDay } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonConstants } from "../../common/constants/common-constants";
import ICalendar from "../../common/interfaces/date-time-input/ICalendar";
import { CollectionUtils } from "../../common/utils/collection-utils";
import { CommonUtils } from "../../common/utils/common-utils";
import { DateUtils } from "../../common/utils/date-utils";

@Component({
    selector: 'sfc-date-time-calendar',
    templateUrl: './sfc-date-time-calendar.component.html',
    styleUrls: ['../../common/styles/sfc-base-input.component.css', '../../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-date-time-calendar.component.css', './sfc-date-time-calendar-dark-theme.component.css']
})
export class DateTimeCalendarComponent implements OnInit {

    /**
     * current date value
     * if change rebuild calendar
     */
    _currentDate = null;
    @Input('current-date')
    set currentDate(value: Date) {
        this._currentDate = value;
        this.setDate();
    }
    get currentDate() {
        return this._currentDate;
    }

    /**
     * from what day start week
     */
    @Input('week-start')
    weekStart: WeekDay = WeekDay.Monday;

    /**
     * from this date
     */
    @Input('min-date')
    minDate: Date;

    /**
     * to this date
     */
    @Input('max-date')
    maxDate: Date;

    /**
     * disabled to select days in calendar
     */
    @Input('disabled-days')
    disabledDays: Date[] = [];

    /**
    * formate date locale
    */
    @Input()
    locale: string = 'en-US';

    /**
     * date selected event
     */
    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    // calendar configuration
    calendar: ICalendar;

    constructor() {
        this.calendar = {
            weekDays: [],
            weeks: []
        };
    }

    ngOnInit(): void {
        this.setDate();
    }

    get calendarMonth() {
        return CommonUtils.isDefined(this.currentDate) ? formatDate(this.currentDate, 'MMMM y', this.locale) : '';
    }

    dayOfWeekAsString(dayIndex: number) {
        return CommonConstants.DAYS_OF_WEEK_3[dayIndex] || '';
    }

    getDateClasses(date: Date) {
        const isDisabled = this.isDisabled(date);
        return {
            disabled: isDisabled,
            selected: isDisabled ? false : this.isCurrentDate(date)
        };
    }

    isDisabled(date: Date) {
        let isDisabledMinDate = false,
            isDisabledMaxDate = false,
            isDisabledDate = false;

        if (this.minDate) {
            isDisabledMinDate = !DateUtils.isDateGreatOrEqual(date, this.minDate);
        }

        if (this.maxDate) {
            isDisabledMaxDate = DateUtils.isDateGreat(date, this.maxDate);
        }

        if (CollectionUtils.any(this.disabledDays)) {
            isDisabledDate = CollectionUtils.hasItemByPredicate(this.disabledDays, (disabledDate: Date) => {
                return DateUtils.isEqualDates(disabledDate, date);
            });
        }

        return isDisabledMinDate || isDisabledMaxDate || isDisabledDate;
    }

    getDateNumber(date: Date) {
        return formatDate(date, 'dd', this.locale);
    }

    private isCurrentDate(date: Date) {
        return this.getDateNumber(date) === this.getDateNumber(this.currentDate);
    }

    private setDate() {
        if (CommonUtils.isDefined(this.currentDate)) {
            this.calendar.weeks = [];

            const year = this.currentDate.getFullYear(),
                month = this.currentDate.getMonth(),
                firstDayOfMonth = DateUtils.getFirstDayOfMonthByYearAndMonth(year, month),
                lastDayOfMonth = DateUtils.getLastDayOfMonthByYearAndMonth(year, month),
                dayOfWeek = firstDayOfMonth.getDay().toString(),
                weekCount = DateUtils.getWeeksNumberInMonth(this.currentDate),
                days: Date[] = [];

            this.calendar.weekDays = this.getDaysInWeek();

            for (let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
                if (i === firstDayOfMonth.getDate()) {
                    let iWeek = this.calendar.weekDays.indexOf(dayOfWeek);
                    if (iWeek > 0) {
                        for (let x = 0; x < iWeek; x++) {
                            days.push(null);
                        }
                    }
                }

                days.push(DateUtils.getNextDate(firstDayOfMonth, i));
            }

            for (let weekIndex = 0; weekIndex < weekCount; weekIndex++) {
                let daysInWeek = days.slice(weekIndex * CommonConstants.DAYS_IN_WEEK, (weekIndex + 1) * CommonConstants.DAYS_IN_WEEK);

                if (CollectionUtils.any(daysInWeek)) {
                    this.calendar.weeks.push(daysInWeek);
                }
            }
        }
    }

    private getDaysInWeek() {
        let days = [];
        for (var i = this.weekStart; days.length < CommonConstants.DAYS_IN_WEEK; i++) {
            if (i > 6) {
                i = 0;
            }
            days.push(i.toString());
        }

        return days;
    }

    onSelectDate(event: MouseEvent, date: Date) {
        if (!this.isCurrentDate(date)) {
            this.selected.emit({ event, date });
        }
    }
}