import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
                // email: [''],
                // fullname: ['Bill Gates'],
                // phone: [{
                //     value: '0497 88 88 88',
                //     disabled: true
                // }],
                firstName: [{
                    value: 'asd',
                    disabled: false
                }, [Validators.required, Validators.minLength(2)]]
            },
            // Uncomment to test `registerOnTouched`
            // { validator: { updateOn: 'blur' } }
        );
    }

    onChange(value: any){
        console.log(value);
    }
}