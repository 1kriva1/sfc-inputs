import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'toggle-input-app',
    templateUrl: './toggle-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './toggle-input.component.css'
    ]
})
export class ToggleInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {

        this.customInputForm = this.formBuilder.group(
            {
                inputToggleNull: [null],
                inputToggleLabel: [null],
                inputTogglePlaceholder: [null],
                inputToggleLabelAndPlaceholder: [null],
                inputToggleIcon: [null],
                inputToggleIconAndLabel: [null],
                inputToggleCustomPositiveIcon: [null],
                inputToggleCustomNegativeIcon: [null],
                inputToggleCustomIcons: [null],
                inputToggleCustomLabels: [null],
                inputToggleCustomLabelsIcon: [null],
                inputToggleCustomLabelsDisabled: [{
                    value: true,
                    disabled: true
                }, []],
                inputToggleHelper: [null],
                inputToggleHelperAndLabel: [null],
                inputToggleHelperAndLabelAndIcon: [null],
                inputToggleDisabled: [{
                    value: false,
                    disabled: true
                }, []],
                inputToggleDisabledAndLabel: [{
                    value: true,
                    disabled: true
                }, []],
                inputToggleDisabledAndLabelAndIcon: [{
                    value: true,
                    disabled: true
                }, []],
                inputToggleValue: [true],
                inputToggleValueAndPlaceholder: [true],
                inputToggleValueAndIconLabel: [true],
                inputToggleRequiredTrue: [null, {
                    validators: [Validators.requiredTrue]
                }],
                inputToggleRequiredTrueValid: [true, {
                    validators: [Validators.requiredTrue]
                }],
                inputToggleRequiredTrueInvalid: [false, {
                    validators: [Validators.requiredTrue]
                }],
                inputToggleValueInvalidMessageRequiredTrue: [false, {
                    validators: [Validators.requiredTrue]
                }],
                inputToggleValueValidMessageRequiredTrue: [true, {
                    validators: [Validators.requiredTrue]
                }],
                inputToggleValueValidMessageRequiredTrueEmptyHelperText: [null, {
                    validators: [Validators.requiredTrue]
                }]
            }
        );
    }
}