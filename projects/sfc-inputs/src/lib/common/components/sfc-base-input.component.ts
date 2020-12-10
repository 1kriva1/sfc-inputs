import { ChangeDetectorRef, AfterViewInit, Input, ViewChild, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { NgControl, ControlValueAccessor, ValidationErrors } from '@angular/forms';
import IValidation from '../interfaces/IValidation';
import { InputRefDirective } from '../directives/input-ref.directive';
import { CommonConstants, StyleClass } from '../constants/common-constants';
import { CommonUtils } from '../utils/common-utils';

export default abstract class BaseInputComponent<T> implements ControlValueAccessor, AfterViewInit {

    @Input()
    id: string;

    @Input()
    label: string;

    @Input()
    @HostBinding('class.disabled')
    disabled: boolean;

    @Input('placeholder')
    _placeholder: string;

    /*
    * Icon prefix (example: fa fa-user)
    */
    @Input()
    icon: string;

    /*
    * Helper text  under input
    */
    @Input('helper-text')
    _helperText: string;

    /*
    * Validation messages (key - validation rule, value - error message)
    */
    @Input()
    validations: IValidation = {};

    @ViewChild(InputRefDirective, { static: false })
    protected input: InputRefDirective;

    @ViewChild(InputRefDirective, { static: false, read: ElementRef })
    protected elementRefInput: ElementRef;

    protected value: T = null;

    /**
     * input componnent validation flag
     */
    protected isInvalid: boolean = false;

    /**
     * input componnent validation errors
     */
    protected innerErrors: ValidationErrors = {};

    /*
    * Is input on focus
    */
    @HostBinding('class.focus')
    protected get isFocus() {
        return this.input ? this.input.isOnFocus : false;
    }

    @HostBinding('class.withIcon')
    protected get withIcon() {
        return !CommonUtils.isNullOrEmptyString(this.icon);
    }

    constructor(protected ngControl: NgControl, protected changeDetector: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    /*
    * Value empty if:
    * 1. Null
    * 2. Undefined
    */
    protected get isValueDefined() {
        return CommonUtils.isDefined(this.value);
    }

    protected get labelClass(): any {
        return this._placeholder || this.isFocus || this.value ? StyleClass.Active : '';
    }

    protected get iconClass() {
        const classes = {},
            validationClass = this.validationClass;

        if (this.icon) {
            // example: fa fa-star
            const iconParts = this.icon.split(' ');
            iconParts.forEach(part => classes[part] = true)
        }

        if (validationClass) {
            classes[validationClass] = true;
        } else {
            if (this.isFocus) {
                classes[StyleClass.Active] = true;
            }
        }

        return classes;
    }

    /*
    * Return validation class for component:
    * 1. Valid - 'valid'
    * 2. Invalid - 'invalid'
    */
    protected get validationClass() {
        if (this.input) {

            if (this.input.isDirty) {
                return !this.input.isValid || this.isInvalid ? StyleClass.Invalid : StyleClass.Valid;
            }

            if (this.input.hasInvalidValue || this.isInvalid) {
                return StyleClass.Invalid;
            }
        }

        return null;
    }

    protected get placeholder() {
        return this._placeholder && !this.isFocus ? this._placeholder : '';
    }

    /*
    * Return helper text if input has NOT error, 
    * otherwise return first error message
    */
    protected get helperText() {
        return (this.input && this.input.isInvalid) || this.isInvalid ? this.errorMessage : this._helperText;
    }

    /*
    * Get first error message from custom validation error mappings (or default)
    */
    private get errorMessage() {
        return this.input ? this.validationMessages[0] || CommonConstants.DEFAULT_ERROR_MESSAGE : '';
    }

    private get validationMessages() {
        const messages = [];

        Object.keys(this.validations).forEach(key => {
            if (this.validationErrors[key]) {
                messages.push(this.validations[key]);
            }
        });

        return messages;
    }

    /*
    * Return all input validation errors (ngControl errors)
    */
    protected get validationErrors() {
        return this.input
            ? CommonUtils.isDefined(this.input.errors) ? { ...this.input.errors, ...this.innerErrors } : this.innerErrors
            : this.innerErrors
    }

    protected setOnFocusEvent(element: ElementRef) {
        if (element) {
            this.renderer.listen(element, 'click', () => {
                this.elementRefInput.nativeElement.focus();
            });
        }
    }

    protected clearInnerErrors() {
        this.innerErrors = {};
        this.isInvalid = false;
    }
    
    protected toggleInnerErrors(validationKey: string, isInvalid: boolean) {
        this.isInvalid = isInvalid;

        if (isInvalid) {
            this.innerErrors = CommonUtils.addPropertyToObject(this.innerErrors, validationKey, true);
        } else {
            CommonUtils.removePropertyFromObject(this.innerErrors, validationKey);
        }
    }    

    ngAfterViewInit(): void {
        if (this.elementRefInput) {
            this.setOnFocusEvent(this.elementRef.nativeElement.querySelector('i.icon'));
        }

        this.changeDetector.detectChanges();
    }

    /*
    * Write form value to the DOM element (model => view)
    */
    writeValue(value: T): void {
        this.value = value;
    }

    /*
     * Write form disabled state to the DOM element (model => view)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /*
     * Update form when DOM element value changes (view => model)
     */
    registerOnChange(fn: any): void {
        // Store the provided function as an internal method.
        this.propagateChange = fn;
    }

    /*
     * Update form when DOM element is blurred (view => model)
     */
    registerOnTouched(fn: any): void {
        // Store the provided function as an internal method.
        this.propagateBlur = fn;
    }

    protected onChange(newValue: T) {
        this.value = newValue;
        this.propagateChange(this.value);
    }

    protected onBlur() {
        this.propagateBlur();
    }

    private propagateChange = (_: any) => { };

    private propagateBlur = () => { };
}