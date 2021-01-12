import { formatDate } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonConstants, DateTimeViewTypes, StyleClass } from "../../common/constants/common-constants";
import IClock from "../../common/interfaces/date-time-input/IClock";

@Component({
    selector: 'sfc-date-time-clock',
    templateUrl: './sfc-date-time-clock.component.html',
    styleUrls: ['./sfc-date-time-clock.component.css', './sfc-date-time-clock-dark-theme.component.css']
})
export class DateTimeClockComponent implements OnInit {

    /**
    * short time mean 0-12 hours range with period(AM/PM)
    */
    @Input('short-time')
    shortTime: boolean = false;

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
      * current date value
      * if change rebuild clock
      */
     _currentDate = null;
     @Input('current-date')
     set currentDate(value: Date) {
         this._currentDate = value;
     }
     get currentDate() {
         return this._currentDate;
     }

    /**
    * formate date locale
    */
    @Input()
    locale: string = 'en-US';

    // current component view (calendar, hours picker or minutes picker)
    @Input('view')
    currentView: DateTimeViewTypes = DateTimeViewTypes.Hours;

    /**
     * hour selected event
     */
    @Output('hour-selected')
    hourSelected: EventEmitter<any> = new EventEmitter<any>();

    /**
     * minute selected event
     */
    @Output('minute-selected')
    minuteSelected: EventEmitter<any> = new EventEmitter<any>();

    // enum for view
    private DateTimeViewType = DateTimeViewTypes;

    // clock configuration
    private clock: IClock;

    constructor() {
        this.clock = {
            hours: [],
            minutes: []
        };
    }

    ngOnInit(): void {
        this.setClock();
    }

    private get isPM() {
        const hour = +formatDate(this.currentDate, 'H', this.locale);
        return this.shortTime && hour >= CommonConstants.HOURS_IN_SHORT_TIME;
    }

    private get displayTime() {
        const minutesValue = formatDate(this.currentDate, 'm', this.locale),
            hours = this.shortTime ? formatDate(this.currentDate, 'h', this.locale) : formatDate(this.currentDate, 'HH', this.locale),
            minutes = minutesValue.length === 2 ? minutesValue : '0' + minutesValue,
            period = this.shortTime ? ` ${formatDate(this.currentDate, 'a', this.locale)}` : '';

        return `${hours}:${minutes}${period}`;
    };

    private get minutesHandStyle() {
        const M = +formatDate(this.currentDate, 'm', this.locale);
        return {
            transform: 'rotate(' + 360 * M / CommonConstants.MINUTES_IN_HOUR + 'deg)'
        };
    }

    private get hoursHandStyle() {
        const H = +formatDate(this.currentDate, 'H', this.locale);
        return {
            transform: 'rotate(' + 360 * H / CommonConstants.HOURS_IN_SHORT_TIME + 'deg)'
        };
    }

    private setClock() {
        this.clock = {
            hours: [],
            minutes: []
        };

        this.initHours();

        // if not short time - init hours for PM
        if (!this.shortTime)
            this.initHours(false);

        this.initMinutes();
    }

    private initHours(isShortTime: boolean = true) {
        for (let i = 0; i < CommonConstants.HOURS_IN_SHORT_TIME; i++) {
            const x = -((isShortTime ? 162 : 110) * (Math.sin(-Math.PI * 2 * (i / CommonConstants.HOURS_IN_SHORT_TIME)))),
                y = -((isShortTime ? 162 : 110) * (Math.cos(-Math.PI * 2 * (i / CommonConstants.HOURS_IN_SHORT_TIME)))),
                value = isShortTime ? i : i + CommonConstants.HOURS_IN_SHORT_TIME,
                displayValue = i === 0
                    ? isShortTime
                        ? CommonConstants.HOURS_IN_SHORT_TIME
                        : i
                    : i;

            this.addHoursConfigItem(x, y, value, isShortTime ? displayValue : value);
        }
    }

    private addHoursConfigItem(x: number, y: number, value: number, displayValue: number) {
        this.clock.hours.push({
            value: value,
            circle: { cx: x, cy: y },
            text: { x: x, y: y + 7, displayValue: displayValue }
        });
    }

    private initMinutes() {
        for (let minute = 0; minute < CommonConstants.MINUTES_IN_HOUR; minute++) {
            this.clock.minutes.push({
                value: minute,
                circle: this.buildMinuteCircle(minute),
                text: minute % 5 === 0 ? this.buildMinuteText(minute) : null
            })
        }
    }

    private buildMinuteCircle(minute: number) {
        const s = ((minute % 5 === 0) ? 162 : 160),
            r = ((minute % 5 === 0) ? 12 : 3),
            x = -(s * (Math.sin(-Math.PI * 2 * (minute / CommonConstants.MINUTES_IN_HOUR)))),
            y = -(s * (Math.cos(-Math.PI * 2 * (minute / CommonConstants.MINUTES_IN_HOUR))));

        return { cx: x, cy: y, r: r };
    }

    private buildMinuteText(minute: number) {
        const x = -(162 * (Math.sin(-Math.PI * 2 * (minute / CommonConstants.MINUTES_IN_HOUR)))),
            y = -(162 * (Math.cos(-Math.PI * 2 * (minute / CommonConstants.MINUTES_IN_HOUR))));

        return { x: x, y: y + 7 };
    }

    private hourClasses(value: number) {
        const classes = {};

        if (this.isDisabledHour(value)) {
            classes[StyleClass.Disabled] = true;
        }

        if (this.isHourSelected(value)) {
            classes[StyleClass.Selected] = true;
        }

        return classes;
    }

    private isHourSelected(value: number) {
        return +formatDate(this.currentDate, 'H', this.locale) == this.hourFormatedValue(value);
    }

    private isDisabledHour(value: number) {
        const itemDateHour = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), this.hourFormatedValue(value));

        if (this.minDate) {
            const minDateHour = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate(), +formatDate(this.minDate, 'H', this.locale));
            if (itemDateHour < minDateHour) {
                return true;
            }
        }

        if (this.maxDate) {
            const maxDateHour = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate(), +formatDate(this.maxDate, 'H', this.locale));

            if (itemDateHour > maxDateHour) {
                return true;
            }
        }

        return false;
    }

    private onSelectHour(value: number) {
        if (!this.isHourSelected(value)) {
            this.hourSelected.emit(this.hourFormatedValue(value));
        }
    }

    /**
     * clock has value for short and not short time
     * but value is stored only in not short time 
     */
    private hourFormatedValue(value: number) {
        return this.isPM ? value + CommonConstants.HOURS_IN_SHORT_TIME : value;
    }

    private minuteClasses(value: number) {
        const classes = {};

        if (this.isDisabledMinute(value)) {
            classes[StyleClass.Disabled] = true;
        }

        if (this.isMinuteSelected(value)) {
            classes[StyleClass.Selected] = true;
        }

        return classes;
    }

    private isMinuteSelected(value: number) {
        return +formatDate(this.currentDate, 'm', this.locale) == value;
    }

    private isDisabledMinute(value: number) {
        const itemDateMinute = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), this.currentDate.getHours(), value);

        if (this.minDate) {
            const minDateMinute = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate(), this.minDate.getHours(), +formatDate(this.minDate, 'm', this.locale));

            if (itemDateMinute < minDateMinute) {
                return true;
            }
        }

        if (this.maxDate) {
            const maxDateMinute = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate(), this.maxDate.getHours(), +formatDate(this.maxDate, 'm', this.locale));

            if (itemDateMinute > maxDateMinute) {
                return true;
            }
        }

        return false
    }

    private onSelectMinute(event: MouseEvent, value: number) {
        if (!this.isMinuteSelected(value)) {
            this.minuteSelected.emit({ event, value });
        }
    }

    private get isDisabledAM() {
        const itemDateHour = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), this.currentDate.getHours() - CommonConstants.HOURS_IN_SHORT_TIME);
        if (this.minDate) {
            const minDateHour = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate(), +formatDate(this.minDate, 'H', this.locale));
            if (itemDateHour < minDateHour) {
                return true;
            }
        }

        return false;
    }

    private get isDisabledPM() {
        const itemDateHour = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), this.currentDate.getHours() - CommonConstants.HOURS_IN_SHORT_TIME);
        if (this.maxDate) {
            const minDateHour = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate(), +formatDate(this.maxDate, 'H', this.locale));
            if (itemDateHour > minDateHour) {
                return true;
            }
        }

        return false;
    }

    private onAM() {
        if (this.isPM) {
            this.hourSelected.emit(this.currentDate.getHours() - CommonConstants.HOURS_IN_SHORT_TIME);
        }
    }

    private onPM() {
        if (!this.isPM) {
            this.hourSelected.emit(this.currentDate.getHours() + CommonConstants.HOURS_IN_SHORT_TIME);
        }
    }
}