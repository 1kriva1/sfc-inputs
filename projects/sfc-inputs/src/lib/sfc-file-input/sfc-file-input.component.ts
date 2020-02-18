import { Component, Self, Optional, ChangeDetectorRef, HostListener, ElementRef, AfterViewInit, ViewChild, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { StyleClass, FileInputType } from '../common/constants/common-constants';
import { FileUtils } from '../common/utils/file-utils';

@Component({
    selector: 'sfc-file-input',
    templateUrl: './sfc-file-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', './sfc-file-input.component.css']
})
export class FileInputComponent extends BaseInputComponent implements OnInit {

    private FileInputType = FileInputType;

    private readonly WITH_ICON_CLASS = "withIcon";

    private readonly FILE_BUTTON_CLASS = "fileBtn";

    /**
    * Default icon for inline file input
    */
    private readonly DEFAULT_ICON = 'fa fa-upload';

    /**
    * Default placeholder (label) for inline file input
    */
    private readonly DEFAULT_PLACEHOLDER = "Choose file";

    /**
    * By default file input looks like default HTML input (type = text)
    */
    @Input()
    fileInputType: FileInputType = FileInputType.Input;

    /**
    * Indication to use default icon for inline file input
    */
    @Input()
    useDefaultIcon = false;

    /**
    * Indication to show file name and extension for inline file input
    */
    @Input()
    showFileName = true;

    /**
    * Indication to show clear button (for input and inline types)
    */
    @Input()
    showClearButton = true;

    @ViewChild('inputFile', { static: false }) fileInput: ElementRef;

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.onChange(file);
    }

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef, private fileUtils: FileUtils) {

        super(ngControl, changeDetector);
    }

    ngOnInit() {
        if (this.fileInputType == FileInputType.Inline) {
            if (this.useDefaultIcon || (!this.showFileName && !this.icon)) {
                this.icon = this.DEFAULT_ICON;
            }
        }
    }

    get fileName() {
        return this.value ? this.value.name : null;
    }

    get fileSize() {
        return this.value ? this.fileUtils.parseFileSize(this.value.size) : null;
    }

    protected get placeholder() {
        return this._placeholder || '';
    }

    protected get labelClass() {
        const classes = {};

        classes[StyleClass.Active] = true;

        if (this.icon) {
            classes[this.WITH_ICON_CLASS] = true;
        }

        return classes;
    }

    private get inputButtonClass() {
        const classes = {};

        if (!this.icon) {
            classes[this.FILE_BUTTON_CLASS] = true;
        }

        classes[this.validationClass] = true;

        return classes;
    }

    private get validationClass() {
        let result = this.input && this.input.isTouched !== null
            ? this.input.isTouched && this.input.hasError ?
                StyleClass.Invalid : StyleClass.Valid
            : '';
        return result;
    }

    private get inlineValueText() {
        if (this.showFileName) {
            return this.getSlicedText(this.fileName
                ? this.fileName
                : this.placeholder || this.label || this.DEFAULT_PLACEHOLDER);
        }
        return '';
    }

    private getSlicedText(value: string) {
        return value.slice(0, 20)
            + '...'
            + this.fileUtils.getFileExtension(this.value);
    }    

    /**
    * Clear button handler
    */
    private clearData(event: Event): void {
        event.preventDefault();
        this.fileInput.nativeElement.value = null;
        this.onChange(null);
    }
}