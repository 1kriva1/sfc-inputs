import { Component, Self, Optional, ChangeDetectorRef, HostListener, ElementRef, ViewChild, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { FileInputType } from '../common/constants/common-constants';
import { FileUtils } from '../common/utils/file-utils';

@Component({
    selector: 'sfc-file-input',
    templateUrl: './sfc-file-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css', './sfc-file-input.component.css', './sfc-file-input-dark-theme.component.css']
})
export class FileInputComponent extends BaseInputComponent<File> implements OnInit {

    private FileInputType = FileInputType;

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

    @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
        const file = event && event.item(0);
        this.onChange(file);
    }

    constructor(@Self() @Optional() protected ngControl: NgControl, protected changeDetector: ChangeDetectorRef, protected renderer: Renderer2, protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit() {
        if (this.fileInputType == FileInputType.Inline) {
            if (this.useDefaultIcon || !this.showFileName && !this.icon) {
                this.icon = this.DEFAULT_ICON;
            }
        }
    }    

    protected get placeholder() {
        return this._placeholder || '';
    }

    private get fileName() {
        return this.value ? this.value.name : null;
    }

    private get fileSize() {
        return this.value ? FileUtils.parseFileSize(this.value.size) : null;
    }

    private get inlineValueText() {
        if (this.showFileName) {
            return this.fileName
                ? this.fileName
                : this.placeholder || this.label || this.DEFAULT_PLACEHOLDER;
        }

        return '';
    }

    /**
    * Clear button handler
    */
    private clearData(event: Event): void {
        event.preventDefault();
        this.elementRefInput.nativeElement.value = null;
        this.onChange(null);
    }
}