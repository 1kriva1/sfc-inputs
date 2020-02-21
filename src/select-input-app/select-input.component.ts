import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import ISelectData from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectData';
import SelectData from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectData';

export class PersonalData {
    firstName: string;
    lastName: string;
    password: string
}

@Component({
    selector: 'select-input-app',
    templateUrl: './select-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './select-input.component.css'
    ]
})
export class SelectInputAppComponent {
    private customInputForm: FormGroup;
    private theme: string = "common";

    private data: ISelectData[];

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {

        this.data = [{
            key: "1",
            value: "option 1"
        },
        {
            key: "2",
            value: "option 2"
        },
        {
            key: "3",
            value: "option 3"
        },
        {
            key: "4",
            value: "option 4"
        },
        {
            key: "5",
            value: "option 5"
        }];

        this.customInputForm = this.formBuilder.group(
            {
                inputSelectNull: [null],
                inputSelectSecond: [null],
                inputSelectThird: [null],
            }
        );
    }
}