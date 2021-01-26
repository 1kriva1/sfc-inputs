import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, OnInit, HostListener, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonConstants } from '../common/constants/common-constants';
import ValidationConstants from '../common/constants/validation-constants';
import ICroppedEvent from '../common/interfaces/photo-editor/ICroppedEvent';
import { CommonUtils } from '../common/utils/common-utils';
import { FileUtils } from '../common/utils/file-utils';
import { PhotoEditorComponent } from './sfc-photo-editor/sfc-photo-editor.component';

@Component({
    selector: 'sfc-photo-input',
    templateUrl: './sfc-photo-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-photo-input.component.css', './sfc-photo-input-dark-theme.component.css']
})
export class PhotoInputComponent extends BaseInputComponent<File> implements OnInit {

    @Input('show-default-photo')
    showDefaultPhoto: boolean = true;

    @Input('default-photo')
    defaultPhoto: string;

    @Input('clear-button')
    showClearButton: boolean = true;

    @Input('show-icon')
    showIcon: boolean = true;

    emitFiles(event: FileList) {
        this.toggleInnerErrors(CommonConstants.FORMAT_VALIDATOR_KEY, false);

        const file = event && event.item(0);
        if (file && FileUtils.isImage(file)) {
            this.imageFile = file;
            this.showEditor = true;
        } else {
            this.toggleInnerErrors(CommonConstants.FORMAT_VALIDATOR_KEY, true);
        }
    }

    @ViewChild(PhotoEditorComponent, { static: false })
    photoEditor: PhotoEditorComponent;

    _url: string;
    set url(value: string) {
        this._url = value;
    }
    get url(): string {
        return CommonUtils.isDefined(this._url)
            ? this._url
            : this.showDefaultPhoto
                ? CommonUtils.isDefined(this.defaultPhoto)
                    ? this.defaultPhoto
                    : CommonConstants.PHOTO_INPUT.DEFAULT_PHOTO_IMAGE
                : null;
    }

    set value(value: File) {
        this._value = value;

        if (value) {
            this.toggleInnerErrors(CommonConstants.FORMAT_VALIDATOR_KEY, false);
            if (FileUtils.isImage(value)) {
                FileUtils.readAsDataURL(value, (result: string) => this.url = result);
            } else {
                this.toggleInnerErrors(CommonConstants.FORMAT_VALIDATOR_KEY, true);
            }
        }
    }
    get value() {
        return this._value;
    }

    showEditor: boolean = false;

    imageFile: File;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        this.validations = { ...this.validations, ...ValidationConstants.FORMAT_VALIDATION };
        this.icon = this.showIcon
            ? CommonUtils.isNullOrEmptyString(this.icon)
                ? CommonConstants.PHOTO_INPUT.DEFAULT_ICON
                : this.icon
            : CommonUtils.isNullOrEmptyString(this.label) ? CommonConstants.PHOTO_INPUT.DEFAULT_ICON : null;
    }

    get iconClass() {
        const classes = {};
        this.setIconClasses(classes);
        return classes;
    }

    onCropped(event: ICroppedEvent) {
        this.onChange(event.file);
    }

    onClick() {
        this.elementRefInput.nativeElement.value = ''
    }

    onClose() {
        this.showEditor = false;
    }

    onOk() {
        if (this.photoEditor) {
            this.photoEditor.export();
            this.showEditor = false;
        }
    }

    clearData() {
        this.toggleInnerErrors(CommonConstants.FORMAT_VALIDATOR_KEY, false);
        this.url = null;
        this.onChange(null);
    }
}