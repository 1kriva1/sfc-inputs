import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { combineLatest } from 'rxjs';
import { SfcValidators } from 'sfc-inputs'

@Component({
    selector: 'photo-input-app',
    templateUrl: './photo-input.component.html',
    styleUrls: [
        '../app/app.component.css',
        './photo-input.component.css'
    ]
})
export class PhotoInputAppComponent extends BaseAppInputComponent {

    private httpClient: HttpClient;
    public defaultPhoto = '../assets/barack-obama.png';
    private imageValue: any;
    private invalidValue: any;

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute, httpClient: HttpClient) {
        super(formBuilder, router, activatedRoute);
        this.httpClient = httpClient;
    }

    ngOnInit() {
        const validValue$ = this.httpClient.get('/assets/Capture.png', { responseType: 'blob' });
        const invalidValue$ = this.httpClient.get('/assets/test.txt', { responseType: 'blob' });
        combineLatest([validValue$, invalidValue$])
            .subscribe(pairData => {
                this.imageValue = new File([pairData[0]], "Capture.png", { type: "image/png" });
                this.invalidValue = new File([pairData[1]], "test.txt", { type: "text/txt" });
                this.initForm();
            });
    }

    private initForm() {
        this.customInputForm = this.formBuilder.group(
            {
                inputPhotoNull: [null],
                inputPhotoLabel: [null],
                inputPhotoIcon: [null],
                inputPhotoEmptyDefaultPhoto: [null],
                inputPhotoCustomDefaultPhoto: [null],
                inputPhotoHelperText: [null],
                inputPhotoHideIcon: [null],
                inputPhotoDisabled: [{
                    value: null,
                    disabled: true
                }],
                inputPhotoValue: [this.imageValue],
                inputPhotoWithotClearButton: [this.imageValue],
                inputPhotoInvalidValue: [this.invalidValue],
                inputPhotoValidationSuccess: [this.imageValue, {
                    validators: [Validators.required, SfcValidators.FileMaxSize(2000000)]
                }],
                inputPhotoValidationFailed: [this.imageValue, {
                    validators: [Validators.required, SfcValidators.FileMaxSize(2000)]
                }],
                inputPhotoValidationFailedMessage: [this.imageValue, {
                    validators: [Validators.required, SfcValidators.FileMaxSize(2000)]
                }]
            }
        );
    }
}