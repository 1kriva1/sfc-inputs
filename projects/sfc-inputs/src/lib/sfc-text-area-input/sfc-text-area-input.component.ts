import { Component, Self, Optional, ChangeDetectorRef, ElementRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonConstants } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-text-area-input',
    templateUrl: './sfc-text-area-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-text-area-input.component.css']
})
export class TextAreaInputComponent
    extends BaseInputComponent {

    private readonly charCounterDelimeter: string = "/";

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {
        super(ngControl, changeDetector);
    }

    private get charCounterValue() {
        const textAreaValueParsed = this.value.replace(/\r?\n/g,"\\n").replace(/\\n/g, "");
        return this.requiredLengthValue
            ? textAreaValueParsed.length + this.charCounterDelimeter + this.requiredLengthValue
            : textAreaValueParsed.length ? textAreaValueParsed.length : '';
    }

    private onKeyUp(e: any) {
        e.target.style.height = "0"+ CommonConstants.CSS_PIXELS;
        e.target.style.height = (e.target.scrollHeight) + CommonConstants.CSS_PIXELS;
    }
}