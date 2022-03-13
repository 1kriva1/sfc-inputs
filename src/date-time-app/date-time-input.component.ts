import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SfcValidators } from 'sfc-inputs';

@Component({
    selector: 'date-time-input-app',
    templateUrl: './date-time-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './date-time-input.component.css'
    ]
})
export class DateTimeInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    tempDate: Date;
    tempTime: Date;
    minDate: Date;
    maxDate: Date;
    disabledDates: Date[];
    timeValidation: Date;

    ngOnInit() {
        this.minDate = new Date();
        this.maxDate = new Date();
        this.tempDate = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate() + 7, this.minDate.getHours() + 3, this.minDate.getMinutes());
        this.tempTime = new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate(), this.minDate.getHours() + 3, this.minDate.getMinutes());
        this.disabledDates = [new Date(2020, 11, 1), new Date(2020, 11, 4), new Date()];
        this.timeValidation = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15, 15, 0, 0);

        this.customInputForm = this.formBuilder.group(
            {
                inputDateNull: [null],
                inputDateLabel: [null],
                inputDateIcon: [null],
                inputDateHelper: [null],
                inputDateDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputDateValue: [new Date(2020, 11, 1)],
                inputDateValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(new Date(2020, 11, 1))]
                }],
                inputDateValid: [new Date(2020, 11, 1), {
                    validators: [SfcValidators.EqualOrInclude(new Date(2020, 11, 1))]
                }],
                inputDateInValid: [new Date(2021, 0, 4), {
                    validators: [SfcValidators.EqualOrInclude(new Date(2020, 11, 1))]
                }],
                inputDateWeekStart: [null],
                inputDateAllButtons: [null],
                inputDateSwithcOnClick: [null],
                inputDateMin: [null],
                inputDateMax: [null],
                inputDateDisabledDay: [null],
                inputDateFormat1: [null],
                // time
                inputTimeNull: [null],
                inputTimeLabel: [null],
                inputTimeIcon: [null],
                inputTimeHelper: [null],
                inputTimeDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputTimeValue: [new Date(2020, 11, 1, 15, 15, 0, 0)],
                inputTimeValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(this.timeValidation)]
                }],
                inputTimeValid: [this.timeValidation, {
                    validators: [SfcValidators.EqualOrInclude(this.timeValidation)]
                }],
                inputTimeInValid: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 3, 15, 0, 0), {
                    validators: [SfcValidators.EqualOrInclude(this.timeValidation)]
                }],
                inputTimeShort: [null],
                inputTimeAllButtons: [null],
                inputTimeSwithcOnClick: [null],
                inputTimeMin: [null],
                inputTimeMax: [null],
                inputTimeShortMinMax: [null],
                inputTimeFormat: [null],
                inputTimeShortFormat: [null],
                // datetime
                inputDateTimeNull: [null],
                inputDateTimeLabel: [null],
                inputDateTimeIcon: [null],
                inputDateTimeHelper: [null],
                inputDateTimeDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputDateTimeValue: [new Date(2020, 11, 1, 3, 15, 0, 0)],
                inputDateTimeValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(new Date(2020, 11, 1, 3, 15, 0, 0))]
                }],
                inputDateTimeValid: [new Date(2020, 11, 1, 3, 15, 0, 0), {
                    validators: [SfcValidators.EqualOrInclude(new Date(2020, 11, 1, 3, 15, 0, 0))]
                }],
                inputDateTimeInValid: [new Date(2021, 0, 4, 3, 15, 0, 0), {
                    validators: [SfcValidators.EqualOrInclude(new Date(2020, 11, 1, 3, 15, 0, 0))]
                }],
                inputDateTimeWeekStart: [null],
                inputDateTimeAllButtons: [null],
                inputDateTimeSwithcOnClick: [null],
                inputDateTimeMin: [null],
                inputDateTimeMax: [null],
                inputDateTimeDisabledDay: [null],
                inputDateTimeFormat: [null],
                inputDateTimeShortFormat: [null],
                //year
                inputYear: [null],
            }
        );
    }
}