import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonUtils } from '../common/utils/common-utils';
import { StyleClass } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-checkbox-input',
    templateUrl: './sfc-checkbox-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-checkbox-input.component.css', './sfc-checkbox-input-dark-theme.component.css']
})
export class CheckboxInputComponent extends BaseInputComponent<boolean> {

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
        this.value = false;
    }

    get labelClass(): any {
        return CommonUtils.isNullOrEmptyString(this.displayValue) ? StyleClass.Empty : '';
    }

    get displayValue(): string {
        return this.label || this._placeholder;
    }
}