import { Component, Input, ViewChild, Self, Optional } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import IValidation from '../common/interfaces/IValidation';
import { InputRefDirective } from '../common/directives/input-ref.directive';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-text-input',
    templateUrl: './sfc-text-input.component.html',
    styleUrls: ['./sfc-text-input.component.css']
})
export class TextInputComponent implements ControlValueAccessor {

    // INPUTS

    @Input()
    id: string;

    @Input()
    label: string;

    @Input()
    disabled: boolean;

    @Input()
    type: string = 'text';

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

    private value: string = '';

    // END FIELDS

    constructor(@Self() @Optional() private ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    // STYLE CLASSES

    private get validationClass() {
        if (this.input) {
            return this.input.isTouched
                ? this.input.hasError ? StyleClass.Invalid : StyleClass.Valid
                : '';
        }

        return '';
    }

    private get labelClass() {
        return this._placeholder || this.isFocus || this.value ? StyleClass.Active : '';
    }

    private get iconClass() {
        const classes = {};
        if (this.icon) {
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        if (this.isFocus) {
            classes[StyleClass.Active] = true;
        }

        const validation = this.validationClass;
        if (validation) {
            classes[validation] = true;
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

    get requiredLengthValue() {
        return this.input ? this.input.requiredLength : null;
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

    private propagateChange = (_: any) => { };

    private propagateBlur = () => { };
}