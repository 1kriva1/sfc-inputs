import { ChangeDetectorRef, AfterViewInit, Input, ViewChild } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import IValidation from '../interfaces/IValidation';
import { InputRefDirective } from '../directives/input-ref.directive';
import { CommonConstants, StyleClass } from '../constants/common-constants';

export default abstract class BaseInputComponent implements ControlValueAccessor, AfterViewInit {

    @Input()
    id: string;

    @Input()
    label: string;

    @Input()
    disabled: boolean;

    @Input('placeholder')
    _placeholder: string;

    @Input()
    type: string = 'text';

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
    * Validation messages (key - validation rule, value - error message)
    */
    @Input()
    validations: IValidation = {};

    @ViewChild(InputRefDirective, { static: false })
    protected input: InputRefDirective;

    protected value: any = '';

    constructor(protected ngControl: NgControl, protected changeDetector: ChangeDetectorRef) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    protected get labelClass(): any {
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

    protected get requiredLengthValue() {
        return this.input ? this.input.requiredLength : null;
    }

    ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
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

    protected onChange(newValue: any) {
        this.value = newValue;
        this.propagateChange(this.value);
    }

    protected onBlur() {
        this.propagateBlur();
    }

    private propagateChange = (_: any) => { };

    private propagateBlur = () => { };
}