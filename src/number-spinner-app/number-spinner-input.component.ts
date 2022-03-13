import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SfcValidators } from 'sfc-inputs';

@Component({
    selector: 'number-spinner-input-app',
    templateUrl: './number-spinner-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './number-spinner-input.component.css'
    ]
})
export class NumberSpinnerInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {

        this.customInputForm = this.formBuilder.group(
            {
                inputNumberNull: [null],
                inputNumberLabel: [null],
                inputNumberIcon: [null],
                inputNumberHelper: [null],
                inputNumberLabelHelper: [null],
                inputNumberLabelIconHelper: [null],
                inputNumberCustomNext: [null],
                inputNumberCustomPrev: [null],
                inputNumberCustomNextPrev: [null],
                inputNumberMax: [null],
                inputNumberMin: [null],
                inputNumberMaxMin: [null],
                inputNumberMaxStep: [null],
                inputNumberMinStep: [null],
                inputNumberMaxMinStep: [null],
                inputNumberFixed: [null],
                inputNumberFixedActions: [null],
                inputNumberFixedAll: [null],
                inputNumberDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputNumberFixedDisabled: [{
                    value: 3,
                    disabled: true
                }],
                inputNumberFixedAllDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputNumberValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(1)]
                }],
                inputNumberValidationLabel: [4, {
                    validators: [Validators.max(3)]
                }],
                inputNumberValidationIcon: [null, {
                    validators: [Validators.min(3)]
                }],
                inputNumberValidationMessage: [null, {
                    validators: [SfcValidators.EqualOrInclude(1)]
                }],
                inputNumberValidationLabelMessage: [4, {
                    validators: [Validators.max(3)]
                }],
                inputNumberValidationIconMessage: [null, {
                    validators: [Validators.min(3)]
                }],
            }
        );
    }
}