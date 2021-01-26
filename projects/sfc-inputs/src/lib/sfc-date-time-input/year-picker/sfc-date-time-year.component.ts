import { formatDate } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CollectionUtils } from "../../common/utils/collection-utils";
import { CommonUtils } from "../../common/utils/common-utils";

@Component({
    selector: 'sfc-date-time-year',
    templateUrl: './sfc-date-time-year.component.html',
    styleUrls: ['./sfc-date-time-year.component.css', './sfc-date-time-year-dark-theme.component.css']
})
export class DateTimeYearComponent implements OnInit {

    /**
      * current date value
      * if change rebuild years picker
      */
    _currentDate = null;
    @Input('current-date')
    set currentDate(value: Date) {
        this._currentDate = value;

        if (CommonUtils.isDefined(value))
            this.initYears(value.getFullYear());
    }
    get currentDate() {
        return this._currentDate;
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
    * formate date locale
    */
    @Input()
    locale: string = 'en-US';

    /**
     * year selected  event
     */
    @Output()
    selected: EventEmitter<any> = new EventEmitter<any>();

    years: number[];

    constructor() {
        this.years = [];
    }

    ngOnInit() {
        if (this.isDateDefined) {
            this.initYears(this.currentDate.getFullYear());
        }
    }

    private initYears(year) {
        this.years = [];

        for (var i = year - 3; i < year + 4; i++) {
            this.years.push(i);
        }
    }

    isCurrentYear(year: number) {
        return +formatDate(this.currentDate, 'yyyy', this.locale) === year;
    }

    get isDateDefined() {
        return CommonUtils.isDefined(this.currentDate);
    }

    isDisabled(year: number) {
        let isDisabledByMinDate = false,
            isDisabledByMaxDate = false;

        if (this.minDate) {
            isDisabledByMinDate = year < this.minDate.getFullYear();
        }

        if (this.maxDate) {
            isDisabledByMaxDate = year > this.maxDate.getFullYear();
        }

        return isDisabledByMinDate || isDisabledByMaxDate;
    }

    onYearRangeBefore() {
        this.setYearsList(false);
    }

    onYearRangeAfter() {
        this.setYearsList(true);
    }

    private setYearsList(isAfter: boolean) {
        if (CollectionUtils.any(this.years)) {
            let yearsList = [];

            this.years.forEach((year: number) => {
                yearsList.push(isAfter ? year + 1 : year - 1);
            });

            this.years = yearsList;
        } else {
            if (this.isDateDefined) {
                this.initYears(this.currentDate.getFullYear());
            }
        }
    }

    onSelectYear(year: number) {
        if (this.selected) {
            this.selected.emit(year);
        }
    }
}