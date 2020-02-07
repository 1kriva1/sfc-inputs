import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';

export class PersonalData {
    firstName: string;
    lastName: string;
    password: string
}

@Component({
    selector: 'text-area-app',
    templateUrl: './text-area.component.html',
    styleUrls: [
        '../app/app.component.css',
        './text-area.component.css'
    ]
})
export class TextAreaAppComponent {
    customInputForm: FormGroup;
    private theme: string = "common";

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.customInputForm = this.formBuilder.group(
            {
                labelTextArea: [""],
                placeholderTextArea: [""],
                placlabelTextArea: [""],
                labelTextAreaDis: [{
                    value: '',
                    disabled: true
                }, []],
                placeholderTextAreaDis: [{
                    value: '',
                    disabled: true
                }, []],
                placlabelTextAreaDis: [{
                    value: '',
                    disabled: true
                }, []],
                labelTextAreaIcon: [""],
                placeholderTextAreaIcon: [""],
                placlabelTextAreaIcon: [""],
                labelTextAreahelper: [""],
                placeholderTextAreahelper: [""],
                placlabelTextAreahelper: [""],
                undefTextAreaValidation: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                defTextAreaValidation: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationEmpty: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationVal: ["tests \n asdasd\n", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                defTextAreaValidationVal: ["tests \n asdasd\n", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationEmptyVal: ["tests \n asdasd\n", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationValUndf: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                defTextAreaValidationValUndf: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationEmptyValUndf: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
            },
        );
    }
}