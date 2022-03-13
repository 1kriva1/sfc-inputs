import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SfcValidators } from 'sfc-inputs';

@Component({
    selector: 'range-input-app',
    templateUrl: './range-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './range-input.component.css'
    ]
})
export class RangeInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {

        this.customInputForm = this.formBuilder.group(
            {
                inputRangeNull: [null],
                inputRangeLabel: [null],
                inputRangeIcon: [null],
                inputRangeHelper: [null],
                inputRangeLabelIcon: [null],
                inputRangeLabelIconHelper: [null],

                inputRangeNullLimits: [null],
                inputRangeLabelLimits: [null],
                inputRangeIconLimits: [null],
                inputRangeHelperLimits: [null],
                inputRangeLabelIconLimits: [null],
                inputRangeLabelIconHelperLimits: [null],

                inputRangeNullLimitIcons: [null],
                inputRangeLabelLimitIcons: [null],
                inputRangeIconLimitIcons: [null],
                inputRangeHelperLimitIcons: [null],
                inputRangeLabelIconLimitIcons: [null],
                inputRangeLabelIconHelperLimitIcons: [null],

                inputRangeNullShowValue: [7],
                inputRangeLabelShowValue: [1],
                inputRangeIconShowValue: [99],
                inputRangeHelperShowValue: [51],
                inputRangeLabelIconShowValue: [43],
                inputRangeLabelIconHelperShowValue: [77],

                inputRangeHelperWithoutTooltip: [10],
                inputRangeLabelIconWithoutTooltip: [21],
                inputRangeLabelIconHelperWithoutTooltip: [44],

                inputRangeNullDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputRangeLabelDisabled: [{
                    value: 44,
                    disabled: true
                }],
                inputRangeIconDisabled: [{
                    value: 17,
                    disabled: true
                }],
                inputRangeHelperDisabled: [{
                    value: 1,
                    disabled: true
                }],
                inputRangeLabelIconDisabled: [{
                    value: 99,
                    disabled: true
                }],
                inputRangeLabelIconHelperDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputRangeNullValidation: [null, {
                    validators: [Validators.max(10)]
                }],
                inputRangeLabelValidation: [null, {
                    validators: [Validators.min(20)]
                }],
                inputRangeIconValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(12)]
                }],
                inputRangeHelperValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(100)]
                }],
                inputRangeLabelIconValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(1)]
                }],
                inputRangeLabelIconHelperValidation: [null, {
                    validators: [Validators.min(100)]
                }],
                inputRangeNullValidationMessage: [12, {
                    validators: [Validators.max(10)]
                }],
                inputRangeLabelValidationMessage: [21, {
                    validators: [Validators.min(20)]
                }],
                inputRangeIconValidationMessage: [null, {
                    validators: [SfcValidators.EqualOrInclude(12)]
                }],
                inputRangeHelperValidationMessage: [100, {
                    validators: [SfcValidators.EqualOrInclude(100)]
                }],
                inputRangeLabelIconValidationMessage: [2, {
                    validators: [SfcValidators.EqualOrInclude(1)]
                }],
                inputRangeLabelIconHelperValidationMessage: [null, {
                    validators: [Validators.min(100)]
                }],



                inputRangeNullVertical: [null],
                inputRangeLabelVertical: [null],
                inputRangeIconVertical: [null],
                inputRangeHelperVertical: [null],
                inputRangeLabelIconVertical: [null],
                inputRangeLabelIconHelperVertical: [null],

                inputRangeNullLimitsVertical: [null],
                inputRangeLabelLimitsVertical: [null],
                inputRangeIconLimitsVertical: [null],
                inputRangeHelperLimitsVertical: [null],
                inputRangeLabelIconLimitsVertical: [null],
                inputRangeLabelIconHelperLimitsVertical: [null],

                inputRangeNullLimitIconsVertical: [null],
                inputRangeLabelLimitIconsVertical: [null],
                inputRangeIconLimitIconsVertical: [null],
                inputRangeHelperLimitIconsVertical: [null],
                inputRangeLabelIconLimitIconsVertical: [null],
                inputRangeLabelIconHelperLimitIconsVertical: [null],

                inputRangeNullShowValueVertical: [7],
                inputRangeLabelShowValueVertical: [1],
                inputRangeIconShowValueVertical: [99],
                inputRangeHelperShowValueVertical: [51],
                inputRangeLabelIconShowValueVertical: [43],
                inputRangeLabelIconHelperShowValueVertical: [77],

                inputRangeHelperWithoutTooltipVertical: [10],
                inputRangeLabelIconWithoutTooltipVertical: [21],
                inputRangeLabelIconHelperWithoutTooltipVertical: [44],

                inputRangeNullDisabledVertical: [{
                    value: null,
                    disabled: true
                }],
                inputRangeLabelDisabledVertical: [{
                    value: 44,
                    disabled: true
                }],
                inputRangeIconDisabledVertical: [{
                    value: 17,
                    disabled: true
                }],
                inputRangeHelperDisabledVertical: [{
                    value: 1,
                    disabled: true
                }],
                inputRangeLabelIconDisabledVertical: [{
                    value: 99,
                    disabled: true
                }],
                inputRangeLabelIconHelperDisabledVertical: [{
                    value: null,
                    disabled: true
                }],
                inputRangeNullValidationVertical: [null, {
                    validators: [Validators.max(10)]
                }],
                inputRangeLabelValidationVertical: [null, {
                    validators: [Validators.min(20)]
                }],
                inputRangeIconValidationVertical: [null, {
                    validators: [SfcValidators.EqualOrInclude(12)]
                }],
                inputRangeHelperValidationVertical: [null, {
                    validators: [SfcValidators.EqualOrInclude(100)]
                }],
                inputRangeLabelIconValidationVertical: [null, {
                    validators: [SfcValidators.EqualOrInclude(1)]
                }],
                inputRangeLabelIconHelperValidationVertical: [null, {
                    validators: [Validators.min(100)]
                }],
                inputRangeNullValidationMessageVertical: [12, {
                    validators: [Validators.max(10)]
                }],
                inputRangeLabelValidationMessageVertical: [21, {
                    validators: [Validators.min(20)]
                }],
                inputRangeIconValidationMessageVertical: [null, {
                    validators: [SfcValidators.EqualOrInclude(12)]
                }],
                inputRangeHelperValidationMessageVertical: [100, {
                    validators: [SfcValidators.EqualOrInclude(100)]
                }],
                inputRangeLabelIconValidationMessageVertical: [2, {
                    validators: [SfcValidators.EqualOrInclude(1)]
                }],
                inputRangeLabelIconHelperValidationMessageVertical: [null, {
                    validators: [Validators.min(100)]
                }],

            }
        );
    }
}