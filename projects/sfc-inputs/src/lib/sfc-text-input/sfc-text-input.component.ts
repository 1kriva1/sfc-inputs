import { Component, Self, Optional, ChangeDetectorRef, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseTextInputComponent from '../common/components/sfc-base-text-input.component';

@Component({
    selector: 'sfc-text-input',
    templateUrl: './sfc-text-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css', './sfc-text-input.component.css']
})
export class TextInputComponent extends BaseTextInputComponent {

    @Input()
    type: string = 'text';

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {
        super(ngControl, changeDetector);
    }
}