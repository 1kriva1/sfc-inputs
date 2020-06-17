import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import SfcValidators from 'projects/sfc-inputs/src/lib/common/validators/sfc-input.validators';

@Component({
    selector: 'file-input-app',
    templateUrl: './file-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './file-input.component.css'
    ]
})
export class FileInputAppComponent {
    private customInputForm: FormGroup;
    private theme: string = "common";

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit() {
        const file = new File([''], "name.jpg");
        Object.defineProperty(
            file, 'size', { value: 200, writable: false });

        const fileInvalid = new File([''], "name.jpg");
        Object.defineProperty(
            fileInvalid, 'size', { value: 2001, writable: false });

        this.customInputForm = this.formBuilder.group(
            {
                inputFileNull: [null],
                inputFileLabel: [null],
                inputFilePlaceholder: [null],
                inputFileLabPlace: [null],
                inputFileDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputFileIcon: [null],
                inputFileHelper: [null],
                inputFileValidationUndefined: [null, {
                    validators: [Validators.required, SfcValidators.FileExtensions(["jpg", "jpeg"])]
                }],
                inputFileValidationDefined: [null, {
                    validators: [Validators.required, SfcValidators.FileMaxSize(2000)]
                }],
                inputFileWithValue: [file, {
                    validators: [Validators.required, SfcValidators.FileMaxSize(2000)]
                }],
                inputFileWithValueInvalid: [fileInvalid, {
                    validators: [Validators.required, SfcValidators.FileMaxSize(2000)]
                }],
                inlineFileNull: [null],
                inlineFileLabel: [null],
                inlineFilePlaceholder: [null],
                inlineFileIcon: [null],
                inlineFileHelper: [null],
                inlineFileDefaultIcon: [null],
                inlineFileFileName: [null],
                inlineFileFileNameIcon: [null],
                inlineFileClearFalse: [null],
                inlineFileDisabled: [{
                    value: null,
                    disabled: true
                }],
                inlineFileValUndf: [null, {
                    validators: [Validators.required, SfcValidators.FileExtensions(["jpg", "jpeg"])]
                }],
                inlineFileValDef: [null, {
                    validators: [Validators.required, SfcValidators.FileExtensions(["jpg", "jpeg"])]
                }],
                inlineFileHasValue: [file, {
                    validators: [Validators.required, SfcValidators.FileExtensions(["jpg", "jpeg"])]
                }],
                inlineFileHasValueInvalid: [file, {
                    validators: [Validators.required, SfcValidators.FileExtensions(["png", "jpeg"])]
                }]
            }
        );
    }
}