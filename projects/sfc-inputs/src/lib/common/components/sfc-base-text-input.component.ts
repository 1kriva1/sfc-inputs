import BaseInputComponent from './sfc-base-input.component';
import { CommonConstants } from '../constants/common-constants';
import { ChangeDetectorRef, Renderer2, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';

export default abstract class BaseTextInputComponent extends BaseInputComponent<string> {

    constructor(protected ngControl: NgControl, protected changeDetector: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
        this.value = '';
    }

    protected get isValueDefined() {
        return super.isValueDefined && this.value !== '';
    }

    protected get requiredLengthValue(): number {
        let requiredLength = null;

        if (this.validationErrors) {
            const minLengthError = this.validationErrors[CommonConstants.MIN_LENGTH_VALIDATOR_KEY],
                maxLengthError = this.validationErrors[CommonConstants.MAX_LENGTH_VALIDATOR_KEY];

            if (minLengthError) {
                requiredLength = minLengthError.requiredLength;
            }

            if (maxLengthError) {
                requiredLength = maxLengthError.requiredLength;
            }
        }

        return requiredLength;
    }

    protected get charCounterValue(): string {
        return this.requiredLengthValue
            ? this.value.length + CommonConstants.COMMON_TEXT_DELIMETER + this.requiredLengthValue
            : null;
    }
}