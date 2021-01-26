import { ElementRef, Injectable } from '@angular/core';
import { CommonConstants } from '../constants/common-constants';
import { CommonUtils } from './common-utils';

// @dynamic
@Injectable()
export class DateUtils {

    public static getFirstDayOfMonth(currentDate: Date): Date {
        if (CommonUtils.isDefined(currentDate) && currentDate instanceof Date) {
            const year = currentDate.getFullYear(),
                month = currentDate.getMonth();
            return new Date(year, month, 1);
        }

        return null;
    }

    public static getFirstDayOfYear(currentDate: Date): Date {
        if (CommonUtils.isDefined(currentDate) && currentDate instanceof Date) {
            return new Date(currentDate.getFullYear(), 0, 1);
        }

        return null;
    }

    public static getFirstDayOfMonthByYearAndMonth(year: number, month: number): Date {
        return new Date(year, month, 1);
    }

    public static getLastDayOfMonth(currentDate: Date): Date {
        if (CommonUtils.isDefined(currentDate) && currentDate instanceof Date) {
            const year = currentDate.getFullYear(),
                month = currentDate.getMonth();
            return new Date(year, month + 1, 0);
        }

        return null;
    }

    public static getLastDayOfYear(currentDate: Date): Date {
        if (CommonUtils.isDefined(currentDate) && currentDate instanceof Date) {
            return new Date(currentDate.getFullYear(), 12, 0);
        }

        return null;
    }

    public static getLastDayOfMonthByYearAndMonth(year: number, month: number): Date {
        return new Date(year, month + 1, 0);
    }

    public static getWeeksNumberInMonth(currentDate: Date): number {
        const firstOfMonth = this.getFirstDayOfMonth(currentDate),
            lastOfMonth = this.getLastDayOfMonth(currentDate),
            used = firstOfMonth.getDay() + lastOfMonth.getDate();
        return Math.ceil(used / CommonConstants.DAYS_IN_WEEK);
    }

    public static getNextDate(currentDate: Date, dateNumber: number): Date {
        let nextDate = new Date(currentDate);
        nextDate.setDate(dateNumber);
        return nextDate;
    }

    public static getNextMonth(currentDate: Date): Date {
        let nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() + 1)
        return nextMonth;
    }

    public static getPreviousMonth(currentDate: Date): Date {
        let nextMonth = new Date(currentDate);
        nextMonth.setMonth(currentDate.getMonth() - 1);
        return nextMonth;
    }

    public static getNextYear(currentDate: Date): Date {
        let nextMonth = new Date(currentDate);
        nextMonth.setFullYear(currentDate.getFullYear() + 1);
        return nextMonth;
    }

    public static getPreviousYear(currentDate: Date): Date {
        let nextMonth = new Date(currentDate);
        nextMonth.setFullYear(currentDate.getFullYear() - 1);
        return nextMonth;
    }

    public static isEqualDates(date1: Date, date2: Date): boolean {
        date1.setHours(0, 0, 0, 0);
        date2.setHours(0, 0, 0, 0);

        return date1.getTime() === date2.getTime();
    }

    public static isDateGreatOrEqual(date1: Date, date2: Date): boolean {
        return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
            >= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    }

    public static isDateTimeGreatOrEqual(date1: Date, date2: Date): boolean {
        return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes())
            >= new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes());
    }

    public static isDateGreat(date1: Date, date2: Date): boolean {
        return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate())
            > new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    }

    public static isDateTimeGreat(date1: Date, date2: Date): boolean {
        return new Date(date1.getFullYear(), date1.getMonth(), date1.getDate(), date1.getHours(), date1.getMinutes())
            > new Date(date2.getFullYear(), date2.getMonth(), date2.getDate(), date2.getHours(), date2.getMinutes());
    }

    public static setHours(date: Date, hour: number): Date {
        date.setHours(hour);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());;
    }

    public static setMinutes(date: Date, minute: number): Date {
        date.setMinutes(minute);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());;
    }

    public static setYear(date: Date, year: number): Date {
        date.setFullYear(year);
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());;
    }
}