import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import BaseAppInputComponent from 'src/base-app-input.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'text-area-app',
    templateUrl: './text-area.component.html',
    styleUrls: [
        '../app/app.component.css',
        './text-area.component.css'
    ]
})
export class TextAreaAppComponent extends BaseAppInputComponent {

    constructor(protected formBuilder: FormBuilder, protected router: Router, protected activatedRoute: ActivatedRoute) { 
        super(formBuilder, router, activatedRoute);
    }

    ngOnInit() {
        this.customInputForm = this.formBuilder.group(
            {
                labelTextArea: [""],
                placeholderTextArea: [""],
                placlabelTextArea: [""],
                labelTextAreaDis: [{
                    value: '',
                    disabled: true
                }, []],
                placeholderTextAreaDis: [{
                    value: '',
                    disabled: true
                }, []],
                placlabelTextAreaDis: [{
                    value: '',
                    disabled: true
                }, []],
                labelTextAreaIcon: [""],
                placeholderTextAreaIcon: [""],
                placlabelTextAreaIcon: [""],
                labelTextAreahelper: [""],
                placeholderTextAreahelper: [""],
                placlabelTextAreahelper: [""],
                undefTextAreaValidation: ["test", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                defTextAreaValidation: ["test", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationEmpty: ["test", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationVal: ["tests \n asdasd\n", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                defTextAreaValidationVal: ["tests \n asdasd\n", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationEmptyVal: ["tests \n asdasd\n", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationValUndf: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                defTextAreaValidationValUndf: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
                undefTextAreaValidationEmptyValUndf: ["", {
                    validators: [Validators.required, Validators.minLength(2), Validators.maxLength(5)]
                }],
            },
        );
    }
}