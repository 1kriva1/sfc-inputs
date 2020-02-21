import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import ISelectData from '../common/interfaces/ISelectData';
import { StyleClass } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-select-input',
    templateUrl: './sfc-select-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-select-input.component.css']
})
export class SelectInputComponent extends BaseInputComponent implements OnInit {

    @Input()
    defaultDisplayValue: ISelectData = { value: "Choose your option", key: "-1" };

    @Input()
    showDefaultOption: boolean = true;

    @Input()
    isMultiple: boolean = false;

    @Input()
    data: ISelectData[] = [];

    @ViewChild('inputSelect', { static: false }) selectInput: ElementRef;

    private displayValue: string;

    private test: boolean;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {
        super(ngControl, changeDetector);
    }

    get dropdownClasses() {
        const classes = {};

        if (this.test) {
            classes["active"] = true;
            

        } else {

            // if (this.isMultiple && )
            //     classes["active"] = true;
            console.log("lost focus");
        }

        return classes;
    }

    private get validationClass() {
        let result = this.input && this.input.isTouched !== null
            ? this.input.isTouched && this.input.hasError ?
                StyleClass.Invalid : StyleClass.Valid
            : '';
        return result;
    }

    get dropdownWidthStyle() {
        const classes = {},
            width = this.selectInput ? this.selectInput.nativeElement.offsetWidth : 0,
            left = this.selectInput ? this.selectInput.nativeElement.offsetLeft : 0;

        if (this.test) {
            classes["width"] = width + "px";
            classes["left"] = left + "px";
        }

        return classes;
    }

    protected get labelClass() {
        const classes = {};

        classes[super.labelClass] = true;

        if (this.icon) {
            classes[StyleClass.WithIcon] = true;
        }

        if (this.isFocus) {
            classes[this.validationClass] = true;
        }

        return classes;
    }

    setOptionValue(event: any, item: any): void {
        // if (this.isMultiple)
        //     event.preventDefault();

        this.onChange(item.key);
        this.displayValue = item.value;
    }

    openDropdownContent() {
        this.selectInput.nativeElement.focus();
    }

    checkOption() {
        
        this.test = true;
    }

    changeOption(event: any) {
        // this.test = !this.test;
    }

    ngOnInit(): void {

        if (this.showDefaultOption) {
            this.data.unshift(this.defaultDisplayValue);
            // this.onChange(this.defaultDisplayValue.key);
            // this.displayValue = this.defaultDisplayValue.value;        
        }

        if (this.value !== null && this.value !== undefined) {

            let valueText: string;
            if (this.data && this.data.length > 0) {
                let dataValue = this.data.find(i => i.key === this.value);

                if (dataValue) {
                    valueText = dataValue.value;
                }
            }

            this.displayValue = valueText;
        }
    }
}