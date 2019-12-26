import { Component, OnInit, Input, AfterContentInit, HostBinding, ViewChild, AfterViewInit, ElementRef, Self, Optional, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

@Component({
    selector: 'sfc-text-input',
    templateUrl: './sfc-text-input.component.html',
    styleUrls: ['./sfc-text-input.component.css']
})
export class TextInputComponent implements OnInit, AfterContentInit, AfterViewInit, ControlValueAccessor {

    // INPUTS

    @Input()
    id: string;

    @Input()
    label: string;

    @Input()
    placeholder: string;

    @Input()
    disabled: boolean;

    // END INPUTS

    @ViewChild('textInput', { static: false })
    input: ElementRef;

    private value: string;

    constructor(
        // Retrieve the dependency only from the local injector,
        // not from parent or ancestors.
        @Self()
        // We want to be able to use the component without a form,
        // so we mark the dependency as optional.
        @Optional()
        private ngControl: NgControl) {

        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit(): void {

    }

    ngAfterContentInit(): void {

    }

    ngAfterViewInit(): void {
        console.log(this.input);
    }

    get isValid() {
        return this.ngControl ? this.ngControl.valid : false;
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
        //this.onTouched = fn;
    }


    private onChange(news: any) {
        console.log(news);
        this.value = news;
        // update the form
        this.propagateChange(this.value);
    }

    private propagateChange = (_: any) => { };
}