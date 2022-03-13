import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SfcValidators } from 'sfc-inputs';

@Component({
    selector: 'star-rating-input-app',
    templateUrl: './star-rating-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './star-rating-input.component.css'
    ]
})
export class StarRatingInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    data: any[] = [3, 4, 5, 2, 8];

    data2: any[] = [1, 2];

    data10: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    ngOnInit() {

        this.customInputForm = this.formBuilder.group(
            {
                inputStarRatingNull: [null],
                inputStarRatingLabel: [null],
                inputStarRatingIcon: [null],
                inputStarRatingHelper: [null],
                inputStarRatingHelperLabel: [null],
                inputStarRatingHelperLabelIcon: [null],
                inputStarRatingCounter: [null],
                inputStarRatingResetButton: [null],
                inputStarRatingCounterResetButton: [null],
                inputStarRatingCounterValue: [2],
                inputStarRatingResetButtonValue: [5],
                inputStarRatingCounterResetButtonValue: [8],
                inputStarRatingDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputStarRatingDisabledValue: [{
                    value: 5,
                    disabled: true
                }],
                inputStarRatingDisabledValueActions: [{
                    value: 5,
                    disabled: true
                }],
                inputStarRatingValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude(5)]
                }],
                inputStarRatingValidationActions: [2, {
                    validators: [Validators.min(3)]
                }],
                inputStarRatingValidationValue: [3, {
                    validators: [Validators.max(4)]
                }],
                inputStarRatingValidationMessage: [null, {
                    validators: [SfcValidators.EqualOrInclude(5)]
                }],
                inputStarRatingValidationActionsMessage: [2, {
                    validators: [Validators.min(3)]
                }],
                inputStarRatingValidationValueMessage: [3, {
                    validators: [Validators.max(4)]
                }],
                inputStarRating2Star: [null],
                inputStarRating10Star: [null],

                // vertical

                inputStarRatingNullVertical: [null],
                inputStarRatingLabelVertical: [null],
                inputStarRatingIconVertical: [null],
                inputStarRatingHelperVertical: [null],
                inputStarRatingHelperLabelVertical: [null],
                inputStarRatingHelperLabelIconVertical: [null],
                inputStarRatingCounterVertical: [null],
                inputStarRatingResetButtonVertical: [null],
                inputStarRatingCounterResetButtonVertical: [null],
                inputStarRatingCounterValueVertical: [2],
                inputStarRatingResetButtonValueVertical: [5],
                inputStarRatingCounterResetButtonValueVertical: [8],
                inputStarRatingDisabledVertical: [{
                    value: null,
                    disabled: true
                }],
                inputStarRatingDisabledValueVertical: [{
                    value: 5,
                    disabled: true
                }],
                inputStarRatingDisabledValueActionsVertical: [{
                    value: 5,
                    disabled: true
                }],
                inputStarRatingValidationVertical: [null, {
                    validators: [SfcValidators.EqualOrInclude(5)]
                }],
                inputStarRatingValidationActionsVertical: [2, {
                    validators: [Validators.min(3)]
                }],
                inputStarRatingValidationValueVertical: [3, {
                    validators: [Validators.max(4)]
                }],
                inputStarRatingValidationMessageVertical: [null, {
                    validators: [SfcValidators.EqualOrInclude(5)]
                }],
                inputStarRatingValidationActionsMessageVertical: [2, {
                    validators: [Validators.min(3)]
                }],
                inputStarRatingValidationValueMessageVertical: [3, {
                    validators: [Validators.max(4)]
                }],
                inputStarRating2StarVertical: [null],
                inputStarRating10StarVertical: [null],
            }
        );
    }
}