import { Component, Input, ViewChild, Self, Optional, AfterViewInit, ChangeDetectorRef, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import IValidation from '../common/interfaces/IValidation';
import { InputRefDirective } from '../common/directives/input-ref.directive';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-text-area-input',
    templateUrl: './sfc-text-area-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-text-area-input.component.css']
})
export class TextAreaInputComponent implements ControlValueAccessor, AfterViewInit {

    // INPUTS

    @Input()
    id: string;

    @Input()
    label: string;

    @Input()
    disabled: boolean;

    @Input('placeholder')
    _placeholder: string;

    /**
    * Icon prefix (example: fa fa-user)
    */
    @Input()
    icon: string;

    /**
    * Helper text  under input
    */
    @Input('helper-text')
    _helperText: string;

    /**
    * Validation messages (key - validation rule key and error message)
    */
    @Input()
    validations: IValidation = {};

    // END INPUTS

    // FIELDS

    @ViewChild(InputRefDirective, { static: false })
    private input: InputRefDirective;

    @ViewChild('textarea', { static: false })
    private inputElement: ElementRef;

    private value: string = '';

    private inputElementHeight: number;

    // END FIELDS

    constructor(@Self() @Optional() private ngControl: NgControl, private changeDetector: ChangeDetectorRef) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
    }

    // STYLE CLASSES

    private get labelClass() {
        return this._placeholder || this.isFocus || this.value ? StyleClass.Active : '';
    }

    private get iconClass() {
        const classes = {};
        if (this.icon) {
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        if (this.input) {
            if (this.input.isValid) {
                classes[StyleClass.Valid] = true;
            } else if (this.input.isInValid) {
                classes[StyleClass.Invalid] = true;
            } else {
                if (this.isFocus) {
                    classes[StyleClass.Active] = true;
                }
            }
        }

        return classes;
    }

    // STYLE CLASSES END

    /**
    * Is input on focus
    */
    private get isFocus() {
        return this.input ? this.input.isOnFocus : false;
    }

    private get placeholder() {
        return this._placeholder && !this.isFocus ? this._placeholder : '';
    }

    private get helperText() {
        return this.input && this.input.hasError ? this.errorMessage : this._helperText;
    }

    private get errorMessage() {
        return this.input ? this.input.errorMessages[0] || CommonConstants.DEFAULT_ERROR_MESSAGE : '';
    }

    private get requiredLengthValue() {
        return this.input ? this.input.requiredLength : null;
    }

    private get charCounterValue() {
        return this.requiredLengthValue
            ? this.value.length + "/" + this.requiredLengthValue
            : this.value.length ? this.value.length : '';
    }

    /**
    * Write form value to the DOM element (model => view)
    */
    writeValue(value: any): void {
        this.value = value;
    }

    /**
     * Write form disabled state to the DOM element (model => view)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * Update form when DOM element value changes (view => model)
     */
    registerOnChange(fn: any): void {
        // Store the provided function as an internal method.
        this.propagateChange = fn;
    }

    /**
     * Update form when DOM element is blurred (view => model)
     */
    registerOnTouched(fn: any): void {
        // Store the provided function as an internal method.
        this.propagateBlur = fn;
    }

    private onChange(newValue: any) {
        this.value = newValue;
        this.propagateChange(this.value);
    }

    private onBlur() {
        this.propagateBlur();
    }

    private onKeyUp(e: any) {
        e.target.style.height = "0px";
        e.target.style.height = (e.target.scrollHeight) + "px";
    }

    private propagateChange = (_: any) => { };

    private propagateBlur = () => { };
}