import { Component, Self, Optional, ChangeDetectorRef, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';

@Component({
    selector: 'sfc-file-input',
    templateUrl: './sfc-file-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-file-input.component.css']
})
export class FileInputComponent extends BaseInputComponent {

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        debugger;
        const file = event && event.item(0);
        this.onChange(file);
    }

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {

            super(ngControl, changeDetector);

    }  

}