import { Directive, HostListener, Self, Optional, Input, Inject } from "@angular/core";
import { NgControl, NG_VALIDATORS } from '@angular/forms';
import IValidation from '../interfaces/IValidation';
import { CommonConstants } from '../constants/common-constants';

@Directive({
    selector: 'sfc-text-input input'
})
export class InputRefDirective {

    @Input()
    validations: IValidation = {};

    isOnFocus: boolean;

    constructor(@Optional() private ngControl: NgControl) {
        this.isOnFocus = false;
    }

    get isTouched(){
        return this.ngControl && (this.ngControl.dirty || this.ngControl.touched);
    }

    get hasError() {
        return this.isTouched && this.ngControl.invalid;
    }   

    get errorMessages() {
        const errors = this.errors;
        const messages = [];
        const keys = Object.keys(this.validations);

        keys.forEach(key => {
            if (errors[key]) {
                messages.push(this.validations[key]);
            }
        });
        return messages;
    }

    get minLengthError() {
        return this.errors[CommonConstants.MIN_LENGTH_VALIDATOR_KEY];
    }

    get maxLengthError() {
        return this.errors[CommonConstants.MAX_LENGTH_VALIDATOR_KEY];
    }

    get requiredLength() {
        if (this.minLengthError) {
            return this.minLengthError.requiredLength;
        }

        return this.maxLengthError ? this.maxLengthError.requiredLength : null;
    }

    private get errors() {
        if (this.hasError && this.ngControl.errors) {
            return this.ngControl.errors;
        }
        return '';
    }

    @HostListener('focus')
    onFocus() {
        this.isOnFocus = true;
    }

    @HostListener('blur')
    onBlur() {
        this.isOnFocus = false;
    }
}