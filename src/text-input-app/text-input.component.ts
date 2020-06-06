import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'text-input-app',
    templateUrl: './text-input.component.html',
    styleUrls: [
        '../app/app.component.css'
    ]
})
export class TextInputAppComponent {
    private customInputForm: FormGroup;
    private theme: string = "common";

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        this.customInputForm = this.formBuilder.group(
            {
                firstName: [""],
                lastName: [{
                    value: '',
                    disabled: false
                }, []],
                password: [{
                    value: '',
                    disabled: false
                }, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
                helper: [''],
                icon: [""],
                disabledInput: [
                    {
                        value: 'I am disabled value1',
                        disabled: true
                    }
                ],
                defined: ['defined value'],
                definedValidation: ["defined val", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefinedValidation: ["s", {
                    validators: [Validators.required, Validators.minLength(2)]
                }],
                fullEmpty: [null],
                onlyPlaceholder: [null]
            }
        );
    }
}