import { formatDate, WeekDay } from '@angular/common';
import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { DateTimeViewTypes } from '../common/constants/common-constants';
import { CommonUtils } from '../common/utils/common-utils';
import { DateUtils } from '../common/utils/date-utils';
import { DateTimeYearComponent } from './year-picker/sfc-date-time-year.component';

@Component({
    selector: 'sfc-date-time-input',
    templateUrl: './sfc-date-time-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-date-time-input.component.css', './sfc-date-time-input-dark-theme.component.css']
})
export class DateTimeInputComponent extends BaseInputComponent<Date> implements OnInit {

    /**
     * show/hide calendar picker 
     */
    @Input()
    date: boolean = true;

    /**
     * show/hide hours and minutes picker
     */
    @Input()
    time: boolean = true;

    /**
     * show/hide years picker
     */
    @Input()
    year: boolean = true;

    /**
     * date value format
     */
    _format: string;
    @Input()
    set format(value: string) {
        this._format = value;
    }
    get format(): string {
        if (CommonUtils.isDefined(this._format)) {
            return this._format;
        } else {
            return this.defaultFormat;
        }
    }

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
     * from what day start week
     */
    @Input('week-start')
    weekStart: WeekDay = WeekDay.Monday;

    /**
     * short time mean 0-12 hours range with period(AM/PM)
     */
    @Input('short-time')
    shortTime: boolean = false;

    /**
     * show/hide clear button
     */
    @Input('clear-button')
    showClearButton = false;

    /**
     * show/hide now button
     */
    @Input('now-button')
    showNowButton = false;

    /**
     * move to next view on click
     */
    @Input('switch-on-click')
    switchOnClick: boolean = false;

    private currentDate: any = null;

    // current component view (calendar, hours picker or minutes picker)
    private currentView: DateTimeViewTypes;

    // previous view (for years picker)
    private prevView: DateTimeViewTypes;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        this.initDates();
        this.setCurrentView();
    }

    private get defaultFormat() {
        if (this.date && this.time) {
            return `d/M/yyyy, ${this.shortTime ? 'h' : 'H'}:mm${this.shortTime ? ' a' : ''}`; // 16/12/2020, 14:23
        }

        if (this.date && !this.time) {
            return 'd/M/yyyy'; // 16/12/2020
        }

        if (!this.date && this.time) {
            return `${this.shortTime ? 'h' : 'H'}:mm${this.shortTime ? ' a' : ''}` // 14:23
        }

        return 'full'; // Monday, June 15, 2015 at 9:03:01 AM GMT+01:00
    }

    private get showClock() {
        return this.currentView === DateTimeViewTypes.Hours || this.currentView === DateTimeViewTypes.Minutes;
    };

    private get showCalendar() {
        return this.currentView === DateTimeViewTypes.Calendar;
    };

    private get showYears() {
        return this.currentView === DateTimeViewTypes.Years;
    };

    private get displayValue() {
        return CommonUtils.isDefined(this.value) ? formatDate(this.value, this.format, this.locale) : '';
    }

    private get displayDay() {
        return this.date
            ? formatDate(this.currentDate, 'EEEE', this.locale)
            : this.time
                ? ''
                : formatDate(this.currentDate, this.format, this.locale);
    };

    private get displayMonth() {
        return formatDate(this.currentDate, 'LLL', this.locale);
    };

    private get displayDayNumber() {
        return formatDate(this.currentDate, 'd', this.locale);
    };

    private get displayYear() {
        return formatDate(this.currentDate, 'y', this.locale);
    };

    private get displayTime() {
        const minutesValue = formatDate(this.currentDate, 'm', this.locale),
            hours = this.shortTime ? formatDate(this.currentDate, 'h', this.locale) : formatDate(this.currentDate, 'HH', this.locale),
            minutes = minutesValue.length === 2 ? minutesValue : '0' + minutesValue,
            period = this.shortTime ? ` ${formatDate(this.currentDate, 'a', this.locale)}` : '';

        return `${hours}:${minutes}${period}`;
    };

    private get isShowMonthBefore() {
        if (this.minDate) {
            const firstDayOfMonth = DateUtils.getFirstDayOfMonth(this.currentDate);
            return DateUtils.isDateGreatOrEqual(firstDayOfMonth, this.minDate);
        }

        return true;
    }

    private get isShowMonthAfter() {
        if (this.maxDate) {
            const lastDayOfMonth = DateUtils.getLastDayOfMonth(this.currentDate);
            return !DateUtils.isDateGreatOrEqual(lastDayOfMonth, this.maxDate);
        }

        return true;
    }

    private get isShowYearBefore() {
        if (this.minDate) {
            const firstDayOfYear = DateUtils.getFirstDayOfYear(this.currentDate);
            return DateUtils.isDateGreatOrEqual(firstDayOfYear, this.minDate);
        }

        return true;
    }

    private get isShowYearAfter() {
        if (this.maxDate) {
            const lastDayOfYear = DateUtils.getLastDayOfYear(this.currentDate);
            return !DateUtils.isDateGreatOrEqual(lastDayOfYear, this.maxDate);
        }

        return true;
    }

    private get isDisabled() {
        if ((this.currentView === DateTimeViewTypes.Calendar && !this.time) || this.currentView === DateTimeViewTypes.Minutes) {
            let isDisabledByMin = false,
                isDisabledByMax = false;
            if (this.minDate) {
                isDisabledByMin = this.time
                    ? !DateUtils.isDateTimeGreatOrEqual(this.currentDate, this.minDate)
                    : !DateUtils.isDateGreatOrEqual(this.currentDate, this.minDate);

            }

            if (this.maxDate) {
                isDisabledByMax = this.time
                    ? DateUtils.isDateTimeGreat(this.currentDate, this.maxDate)
                    : DateUtils.isDateGreat(this.currentDate, this.maxDate);
            }

            return isDisabledByMin || isDisabledByMax;
        }

        return false;
    }

    private initDates() {
        if (this.isValueDefined) {
            this.currentDate = new Date(this.value)
        } else {
            this.currentDate = new Date()
        }
    }

    private setCurrentView() {
        if (this.date || (this.date && this.time))
            this.currentView = DateTimeViewTypes.Calendar;
        else if (!this.date && this.time)
            this.currentView = DateTimeViewTypes.Hours;
    }

    // CALENDAR

    private onSelectDate(parameters: any) {
        this.currentDate = this.time
            ? new Date(parameters.date.getFullYear(), parameters.date.getMonth(), parameters.date.getDate(), this.currentDate.getHours(), this.currentDate.getMinutes())
            : new Date(parameters.date.getFullYear(), parameters.date.getMonth(), parameters.date.getDate());

        if (this.switchOnClick)
            this.onOk(parameters.event);
    }

    // END CALENDAR

    // CLOCK

    private onSelectHour(hour: number) {
        this.currentDate = DateUtils.setHours(this.currentDate, hour);
        if (this.switchOnClick)
            this.currentView = DateTimeViewTypes.Minutes;
    }

    private onSelectMinute(parameters: any) {
        this.currentDate = DateUtils.setMinutes(this.currentDate, parameters.value);
        if (this.switchOnClick)
            this.onOk(parameters.event);
    }

    // END CLOCK

    // YEARS

    private showYearsList() {
        if(this.currentView != DateTimeViewTypes.Years){
            this.prevView = this.currentView;
            this.currentView = DateTimeViewTypes.Years;
        }        
    }

    private onSelectYear(year: number) {
        this.currentDate = DateUtils.setYear(this.currentDate, year);
        this.currentView = this.prevView;
    }

    // END YEARS

    // BUTTON EVENTS

    // click OK button handler
    private onOk(event: MouseEvent) {
        if (this.currentView === DateTimeViewTypes.Calendar) {
            if (this.time) {
                this.currentView = DateTimeViewTypes.Hours;
            } else {
                this.setValueAndHide(event, this.currentDate);
            }
        } else if (this.currentView === DateTimeViewTypes.Hours) {
            this.currentView = DateTimeViewTypes.Minutes;
        } else if (this.currentView === DateTimeViewTypes.Minutes) {
            this.setValueAndHide(event, this.currentDate);
            this.currentView = this.date ? DateTimeViewTypes.Calendar : DateTimeViewTypes.Hours;
        } else if (this.currentView === DateTimeViewTypes.Years) {
            this.currentView = this.prevView;
        } else {
            this.setValueAndHide(event, this.currentDate);
        }
    }

    // click Cancel button handler
    private onCancel(event: MouseEvent) {
        if (this.currentView === DateTimeViewTypes.Calendar) {
            this.hide(event);
        } else if (this.currentView === DateTimeViewTypes.Hours) {
            if (this.date) {
                this.currentView = DateTimeViewTypes.Calendar;
            } else {
                this.hide(event);
            }
        } else if (this.currentView === DateTimeViewTypes.Minutes) {
            this.currentView = DateTimeViewTypes.Hours;
        } else if (this.currentView === DateTimeViewTypes.Years) {
            this.currentView = this.prevView;
        } else {
            this.hide(event);
        }
    }

    // click Now button handler
    private onNow() {
        this.currentDate = new Date();
    }

    // click Clear button handler
    private onClear(event: MouseEvent) {
        this.setValueAndHide(event, null);
    }

    private setValueAndHide(event: MouseEvent, value: Date) {
        this.hide(event);
        this.onChange(value);
    }

    private hide(event: MouseEvent) {
        if (event.stopPropagation)
            event.stopPropagation();
    }

    // END BUTTON EVENTS

    // YEAR AND MONTH HANDLERS

    private onYearAfter() {
        this.currentDate = DateUtils.getNextYear(this.currentDate);
    }

    private onYearBefore() {
        this.currentDate = DateUtils.getPreviousYear(this.currentDate);
    }

    private onMonthBefore() {
        this.currentDate = DateUtils.getPreviousMonth(this.currentDate);
    }

    private onMonthAfter() {
        this.currentDate = DateUtils.getNextMonth(this.currentDate);
    }

    // END YEAR AND MONTH HANDLERS

    // click close handler
    private onClose(event: MouseEvent) {
        this.hide(event);
    }
}