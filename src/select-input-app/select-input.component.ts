import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import ISelectData from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectData';
import SelectData from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectData';
import ISelectDataGroup from 'projects/sfc-inputs/src/lib/common/interfaces/ISelectDataGroup';

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

    private data: any;
    private datagroup: ISelectDataGroup[];

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {

        this.datagroup = [
            {
                key: 1,
                value: "group one",
                options: [{
                    key: "1",
                    value: "option 1",
                    imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
                },
                {
                    key: "2",
                    value: "option 2",
                    imagePath: "data:image/png;base64,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"
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
                }]
            },
            {
                key: 2,
                value: "group two",
                options: [{
                    key: "1",
                    value: "option 1 2",
                    imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
                },
                {
                    key: "2",
                    value: "option 2 2",
                    imagePath: "data:image/png;base64,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"
                },
                {
                    key: "3",
                    value: "option 3 2"
                },
                {
                    key: "4",
                    value: "option 4 2"
                },
                {
                    key: "5",
                    value: "option 5 2"
                }]
            }
        ];

        this.data = [{
            key: 1,
            value: "option 1",
            //imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
        },
        {
            key: 2,
            value: "option 2",
            //imagePath: "data:image/png;base64,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"
        },
        {
            key: 3,
            value: "option 3"
        },
        {
            key: 4,
            value: "option 4"
        },
        {
            key: 5,
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