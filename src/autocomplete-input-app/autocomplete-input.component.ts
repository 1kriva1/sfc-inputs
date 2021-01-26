import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import AutoCompleteService from './autocomplete.service';
import { map, tap } from 'rxjs/operators';
import IAutoCompletePagedModel from './autocomplete-paged.model';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';
import { Observable } from 'rxjs';

@Component({
    selector: 'autocomplete-input-app',
    templateUrl: './autocomplete-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './autocomplete-input.component.css'
    ]
})
export class AutoCompleteInputAppComponent extends BaseAppInputComponent {

    // loader function for scrolling

    private loader = this.getPagedLoadFunction(this.autoCompleteService);

    private loaderFullData = this.getLoadFunction(this.autoCompleteService);

    private data: any[] = [
        {
            key: 1,
            value: 'andrii 1',
            imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
        },
        {
            key: 3,
            value: "anita 3"
        },
        {
            key: 4,
            value: "anton 4"
        },
        {
            key: 5,
            value: "noa 5",
            imagePath: "https://mlqmtwka8c9g.i.optimole.com/gOh5_w-xKCqaYPz/w:366/h:153/q:85/dpr:2.6/https://www.competethemes.com/wp-content/uploads/2015/09/remove-link.png"
        },
        {
            key: 6,
            value: "nina 6"
        },
        {
            key: 7,
            value: "nikita 7"
        },
        {
            key: 8,
            value: "nazar 8"
        },
        {
            key: 9,
            value: "leo 9"
        },
        {
            key: 10,
            value: "apa 10"
        },
        {
            key: 11,
            value: "vova 11"
        }
    ];

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute, private autoCompleteService: AutoCompleteService) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {
        this.customInputForm = this.formBuilder.group(
            {
                inputAutoCompleteNull: [null],
                inputAutoCompleteLabel: [null],
                inputAutoCompletePlaceholder: [null],
                inputAutoCompleteLabelPlaceholder: [null],
                inputAutoCompleteIcon: [null],
                inputAutoCompleteLabelPlaceholderIcon: [null],
                inputAutoCompleteHelper: [null],
                inputAutoCompleteHelperIcon: [null],
                inputAutoCompleteHelperLabelPlaceholder: [null],
                inputAutoCompleteDisabled: [{
                    value: { key: 1, displayValue: 'test value' },
                    disabled: true
                }],
                inputAutoCompleteDisabledLabel: [{
                    value: null,
                    disabled: true
                }],
                inputAutoCompleteDisabledAll: [{
                    value: null,
                    disabled: true
                }],
                inputAutoCompleteValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "anita 3",
                        key: 3
                    }])]
                }],
                inputAutoCompleteValidationSuccess: [{
                    displayValue: "anita 3",
                    key: 3
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "anita 3",
                        key: 3
                    }])]
                }],
                inputAutoCompleteValidationFailed: [{
                    displayValue: "vova 11",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "anita 3",
                        key: 3
                    }])]
                }],
                inputAutoCompleteValidationMessage: [null, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "anita 3",
                        key: 3
                    }])]
                }],
                inputAutoCompleteValidationSuccessMessage: [{
                    displayValue: "anita 3",
                    key: 3
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "anita 3",
                        key: 3
                    }])]
                }],
                inputAutoCompleteValidationFailedMessage: [{
                    displayValue: "vova 11",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "anita 3",
                        key: 3
                    }])]
                }],
                inputAutoCompleteObservable: [null],
                inputAutoCompleteObservableLabel: [null],
                inputAutoCompleteObservablePlaceholder: [null],
                inputAutoCompleteObservableIconPlaceholder: [null],
                inputAutoCompleteObservableHelperLabelPlaceholder: [null],
                inputAutoCompleteObservableDisabledAll: [{
                    value: null,
                    disabled: true
                }],
                inputAutoCompleteObservableValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservableValidationSuccess: [{
                    displayValue: "andrii",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservableValidationFailed: [{
                    displayValue: "vova 11",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservableDebounceLow: [null],
                inputAutoCompleteObservableDebounceHigh: [null],
                inputAutoCompleteObservableCharsToLoad: [null],
                inputAutoCompleteObservablePagedValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservablePagedValidationSuccess: [{
                    displayValue: "andrii",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservablePagedValidationFailed: [{
                    displayValue: "vova 11",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservablePagedScrollValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservablePagedScrollValidationSuccess: [{
                    displayValue: "andrii",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservablePagedScrollValidationFailed: [{
                    displayValue: "vova 11",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservableDataValidation: [null, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservableDataValidationSuccess: [{
                    displayValue: "andrii",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
                inputAutoCompleteObservableDataValidationFailed: [{
                    displayValue: "vova 11",
                    key: 1
                }, {
                    validators: [SfcValidators.EqualOrInclude([{
                        displayValue: "andrii",
                        key: 1
                    }])]
                }],
            }
        );
    }

    private getAutocompleteObservables(controlId: string): Observable<any> {
        return Observable.of(null)
            .concatMap(() => {
                return this.autoCompleteService.getAutoCompletes(this.customInputForm.controls[controlId].value.displayValue).pipe(map(resp => {
                    return { Items: resp.map((s) => { return { value: s.Value, key: s.Key } }), HasNext: false }
                }));
            });
    }

    private getLoadFunction(service: AutoCompleteService) {
        return (parameters: any) => {
            return service.getAutoCompletes(parameters.value).pipe(
                map((resp: any) => {
                    return { Items: resp.map((s) => { return { value: s.Value, key: s.Key } }), HasNext: false }
                })
            );
        };
    }

    private getPagedLoadFunction(service: AutoCompleteService) {
        var page = 1;

        return (parameters: any) => {
            page = parameters.page ? parameters.page : page;

            return service.getPagedAutoCompletes(parameters.value, page, 5).pipe(
                tap((resp: IAutoCompletePagedModel) => {
                    if (resp.HasNext) {
                        page = ++resp.CurrentPage;
                    }
                }),
                map((resp: IAutoCompletePagedModel) => {
                    return { Items: resp.Items.map((s) => { return { value: s.Value, key: s.Key } }), HasNext: resp.HasNext }
                })
            );
        };
    }
}