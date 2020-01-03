import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class PersonalData {
    firstName: string;
    lastName: string;
    password: string
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})
export class AppComponent {
    customInputForm: FormGroup;

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.customInputForm = this.formBuilder.group(
            {
                firstName: ["", { validators: [Validators.required, Validators.minLength(2)] }], // , updateOn: "blur"
                lastName: [{
                    value: '',
                    disabled: false
                }, [Validators.required, Validators.minLength(2)]],
                password: [{
                    value: '',
                    disabled: false
                }, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
                helper: ['ASD'],
                icon: ["", { validators: [Validators.required, Validators.minLength(2)] }],
                disabledInput: [
                    {
                        value: 'I am disabled value',
                        disabled: true
                    }
                ]
            },
            // Uncomment to test `registerOnTouched`
            //{ validator: { updateOn: 'blur' } }
        );
    }
}