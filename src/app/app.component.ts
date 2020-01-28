import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';

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
                // firstName: [""], // , updateOn: "blur"
                // lastName: [{
                //     value: '',
                //     disabled: false
                // }, []],
                // password: [{
                //     value: '',
                //     disabled: false
                // }, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/)]],
                // helper: [''],
                // icon: [""],
                // disabledInput: [
                //     {
                //         value: 'I am disabled value',
                //         disabled: true
                //     }
                // ],
                // defined: ['defined value'],
                // definedValidation: ["defined val", {
                //     validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                // }],
                // undefinedValidation: ["", {
                //     validators: [Validators.required]
                // }],
                // customTextArea: ["asdhj \n asd \n asd", {
                //     validators: [SfcValidators.TextAreaRequired]
                // }],
                file: [null, {
                    validators: [Validators.required, SfcValidators.FileExtensions(["jpg"])]
                }]
            },
            // Uncomment to test `registerOnTouched`
            //{ validator: { updateOn: 'blur' } }
        );


    }

    submit(): void {
        debugger;
        const formValue = this.customInputForm.value;
    }
}