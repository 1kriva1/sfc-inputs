import { Component, Self, Optional, ChangeDetectorRef, HostListener, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';

@Component({
    selector: 'sfc-file-input',
    templateUrl: './sfc-file-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-file-input.component.css']
})
export class FileInputComponent extends BaseInputComponent {

    fileName: string;

    fileSizeValue: string;

    @ViewChild('inputFile', { static: false }) fileInput: ElementRef;

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.fileName = file.name;
        this.fileSizeValue = this.parseFileSize(file.size);
        this.onChange(file);
    }

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {

        super(ngControl, changeDetector);

    }

    protected get labelClass() {
        const classes = {};

        if (super.labelClass) {
            classes[super.labelClass] = true;
        }

        if(this.icon){
            classes["withIcon"] = true;
        }

        return classes;
    }

    clearData(): void {
        this.fileInput.nativeElement.value = null;
        this.fileName = null;
        this.fileSizeValue = null;
        this.onChange(null);
    }

    private parseFileSize(bytes, decimals = 2): string{
        if (bytes === 0) return '0';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}