import { Directive, HostListener, Optional, HostBinding } from "@angular/core";
import { NgControl } from '@angular/forms';
import { StyleClass } from '../constants/common-constants';
import { CommonUtils } from '../utils/common-utils';

@Directive({
    selector: '[sfcinput]'
})
export class InputRefDirective {

    isOnFocus: boolean;

    constructor(@Optional() private ngControl: NgControl) {
        this.isOnFocus = false;
    }

    get isDirty() {
        return this.ngControl && this.ngControl.dirty;
    }

    get hasValue() {
        return this.ngControl && CommonUtils.isDefined(this.ngControl.value) && this.ngControl.value !== '';
    }

    get value() {
        return this.ngControl ? this.ngControl.value : null;
    }

    get hasInvalidValue() {
        return this.hasValue && this.ngControl.invalid;
    }

    get errors() {
        if (this.isInvalid && this.ngControl.errors) {
            return this.ngControl.errors;
        }

        return null;
    }

    @HostBinding('class.' + StyleClass.Valid)
    public get isValid(): Boolean {
        if (this.isDirty) {
            return this.ngControl.valid;
        }

        if (this.hasInvalidValue) {
            return false;
        }
    }

    @HostBinding('class.' + StyleClass.Invalid)
    public get isInvalid(): Boolean {
        if (this.isDirty) {
            return this.ngControl.invalid;
        }

        return this.hasInvalidValue;
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