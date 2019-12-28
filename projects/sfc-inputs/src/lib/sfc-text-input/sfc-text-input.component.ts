import { Component, OnInit, Input, AfterContentInit, HostBinding, ViewChild, AfterViewInit, ElementRef, Self, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import IValidation from '../common/interfaces/IValidation';
import { InputRefDirective } from '../common/directives/input-ref.directive';

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

    @Input('helper-text')
    _helperText: string;
    
    @Input()
    validations: IValidation = {};

    // END INPUTS

    @ViewChild(InputRefDirective, { static: false })
    input: InputRefDirective;

    private readonly invalidClass =  'invalid';

    private readonly validClass =  'valid';

    private readonly activeClass =  'active';

    private value: string = '';

    constructor(@Self() @Optional() private ngControl: NgControl) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    private get isFocus(){
        return this.input ? this.input.isOnFocus : false;
    }

    private get validationClass() {
        if (this.input) {
            return this.input.isTouched
                ? this.input.hasError ? this.invalidClass : this.validClass
                : '';
        }

        return '';
    }

    private get labelClass() {
        return this._placeholder || this.isFocus || this.value ? this.activeClass : '';
    }

    private get placeholder() {
        return this._placeholder && !this.isFocus ? this._placeholder : '';
    }    

    private get helperText() {
        return this.input && this.input.hasError ? this.errorMessage : this._helperText;
    }

    private get errorMessage() {
        return this.input ? this.input.errorMessages[0] : '';
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

    private onChange(news: any) {
        this.value = news;
        this.propagateChange(this.value);
    }

    private onBlur() {
        this.propagateBlur();
    }

    private propagateChange = (_: any) => { };

    private propagateBlur = () => { };
}