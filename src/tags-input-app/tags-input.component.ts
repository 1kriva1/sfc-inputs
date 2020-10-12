import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import ITagsData from 'projects/sfc-inputs/src/lib/common/interfaces/tags-input/ITagsData';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';

@Component({
    selector: 'tags-input-app',
    templateUrl: './tags-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './tags-input.component.css'
    ]
})
export class TagsInputAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) {
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {

        let data = ["tag 1", "asda sd atag 1", "tag 3", "as", "asddddaaaaaasqqqqqqqqqqqq"]

        this.customInputForm = this.formBuilder.group(
            {
                inputTagsNull: [null],
                inputTagsLabel: [null],
                inputTagsPlaceholder: [null],
                inputTagsLabelPlaceholder: [null],
                inputTagsLabelNewTagPlaceholder: [null],
                inputTagsIcon: [null],
                inputTagsIconLabel: [null],
                inputTagsIconLabelPlaceholder: [null],
                inputTagsValue: [data.slice()],
                inputTagsValueLabel: [data.slice()],
                inputTagsValuePlaceholder: [data.slice()],
                inputTagsValueLabelPlaceholder: [data.slice()],
                inputTagsValueLabelPlaceholderIcon: [data.slice()],
                inputTagsHelper: [null],
                inputTagsHelperLabel: [null],
                inputTagsHelperLabelIcon: [null],
                inputTagsDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputTagsLabelDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputTagsLabelPlaceholderDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputTagsLabelPlaceholderIconDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputTagsLabelPlaceholderIconHelperDisabled: [{
                    value: null,
                    disabled: true
                }, []],
                inputTagsLabelPlaceholderIconHelperValueDisabled: [{
                    value: data.slice(),
                    disabled: true
                }, []],
                inputTagsValidation: [{
                    value: '',
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelValidation: [{
                    value: '',
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelIconHelperValidation: [{
                    value: '',
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsValidationFailed: [{
                    value: ['asd'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelValidationFailed: [{
                    value: ['asd'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelIconHelperValidationFailed: [{
                    value: ['asd'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsValidationCustomMsgFailed: [{
                    value: ['asd'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelValidationCustomMsgFailed: [{
                    value: ['asd'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelIconHelperValidationCustomMsgFailed: [{
                    value: ['asd'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsValidationSuccess: [{
                    value: ['rty'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelValidationSuccess: [{
                    value: ['qwe'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsLabelIconHelperValidationSuccess: [{
                    value: ['qwe', 'rty'],
                    disabled: false
                }, [SfcValidators.EqualOrInclude(['qwe', 'rty'])]],
                inputTagsMaxLength: [null, {
                    validators: [SfcValidators.MaxLength(3)]
                }],
                inputTagsMinLength: [null, {
                    validators: [SfcValidators.MinLength(1)]
                }],
                inputTagsMaxMinLength: [null, {
                    validators: [SfcValidators.MaxLength(3), SfcValidators.MinLength(1)]
                }],
                inputTagsMaxLengthInvalid: [['qwe', 'asd', 'asdas', '4'], {
                    validators: [SfcValidators.MaxLength(3)]
                }],
                inputTagsMinLengthInvalid: [[], {
                    validators: [SfcValidators.MinLength(1)]
                }],
                inputTagsMaxMinLengthInvalid: [[], {
                    validators: [SfcValidators.MaxLength(3), SfcValidators.MinLength(1)]
                }],
                inputTagsMaxLengthValid: [['qwe', 'asd', 'asdas'], {
                    validators: [SfcValidators.MaxLength(3)]
                }],
                inputTagsMinLengthValid: [['test 1'], {
                    validators: [SfcValidators.MinLength(1)]
                }],
                inputTagsMaxMinLengthValid: [['test 1', 'test 2'], {
                    validators: [SfcValidators.MaxLength(3), SfcValidators.MinLength(1)]
                }]
            }
        );
    }
}