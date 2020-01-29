import { Component, Self, Optional, ChangeDetectorRef, HostListener, ElementRef, AfterViewInit, ViewChild, Input } from '@angular/core';
import { NgControl, ControlValueAccessor } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { StyleClass, FileInputType } from '../common/constants/common-constants';

@Component({
    selector: 'sfc-file-input',
    templateUrl: './sfc-file-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-file-input.component.css']
})
export class FileInputComponent extends BaseInputComponent {

    private FileInputType = FileInputType;
    
    private readonly DEFAULT_ICON = 'fa fa-upload';

    @Input()
    fileInputType:FileInputType = FileInputType.Input;

    @Input()
    useDefaultIcon = true;

    @Input()
    showFileName = true;

    @ViewChild('inputFile', { static: false }) fileInput: ElementRef;    

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        debugger;
        const file = event && event.item(0);
        this.onChange(file);
    }

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef) {

        super(ngControl, changeDetector);

        if(this.useDefaultIcon && this.fileInputType == FileInputType.Inline)
            this.icon = this.DEFAULT_ICON;
    }

    get fileName() {
        return this.value ? this.value.name : null;
    }

    get fileSize() {
        return this.value ? this.parseFileSize(this.value.size) : null;
    }    

    protected get placeholder() {
        return this._placeholder || '';
    }

    protected get labelClass() {
        const classes = {};

        classes[StyleClass.Active] = true;

        if (this.icon) {
            classes["withIcon"] = true;
        }

        return classes;
    }

    private get inlineValueText(){
        if(this.showFileName){
            return this.fileName ? this.fileName : this.placeholder;
        }
        return '';
    }

    private get validationClass() {
        let result = this.input && this.input.isTouched !== null
            ? this.input.isTouched && this.input.hasError ?
                StyleClass.Invalid : StyleClass.Valid
            : '';
        return result;
    }

    private clearData(): void {
        this.fileInput.nativeElement.value = null;
        this.onChange(null);
    }

    private parseFileSize(bytes, decimals = 2): string {
        if (bytes === 0) return '0';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}