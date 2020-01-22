import { Component, Self, Optional, ChangeDetectorRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';

@Component({
    selector: 'sfc-text-input',
    templateUrl: './sfc-text-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-text-input-dark-theme.css']
})
export class TextInputComponent extends BaseInputComponent {

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {
        super(ngControl, changeDetector);
    }

}