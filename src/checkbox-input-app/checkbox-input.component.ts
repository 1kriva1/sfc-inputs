import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'checkbox-input-app',
    templateUrl: './checkbox-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './checkbox-input.component.css'
    ]
})
export class CheckboxInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {

        this.customInputForm = this.formBuilder.group(
            {
                inputCheckboxNull: [null],
                inputCheckboxLabel: [null],
                inputCheckboxPlaceholder: [null],
                inputCheckboxPlaceholderAndLabel: [null],
                inputCheckboxIcon: [null],
                inputCheckboxIconAndLabel: [null],
                inputCheckboxHelperText: [null],
                inputCheckboxHelperTextLabel: [null],
                inputCheckboxHelperTextLabelIcon: [null],
                inputCheckboxDisabled: [{
                    value: false,
                    disabled: true
                }, []],
                inputCheckboxDisabledLabel: [{
                    value: true,
                    disabled: true
                }, []],
                inputCheckboxDisabledLabelIcon: [{
                    value: false,
                    disabled: true
                }, []],
                inputCheckboxValue: [true],
                inputCheckboxValueLabel: [true],
                inputCheckboxValueLabelIcon: [true],
                inputCheckboxRequiredTrue: [null, {
                    validators: [Validators.requiredTrue]
                }],
                inputCheckboxValueRequiredTrue: [true, {
                    validators: [Validators.requiredTrue]
                }],
                inputCheckboxInvalidValueRequiredTrue: [false, {
                    validators: [Validators.requiredTrue]
                }],
                inputCheckboxValueInvalidMessageRequiredTrue: [false, {
                    validators: [Validators.requiredTrue]
                }],
                inputCheckboxValueValidMessageRequiredTrue: [true, {
                    validators: [Validators.requiredTrue]
                }],
                inputCheckboxValueValidMessageRequiredTrueEmptyHelperText: [null, {
                    validators: [Validators.requiredTrue]
                }]
            }
        );
    }
}