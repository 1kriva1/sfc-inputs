import { Self, Optional, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';

export default abstract class TextBaseInputComponent implements ControlValueAccessor, AfterViewInit {
    
    protected value: string = '';

    constructor(protected ngControl: NgControl, protected changeDetector: ChangeDetectorRef) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
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
        //this.disabled = isDisabled;
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