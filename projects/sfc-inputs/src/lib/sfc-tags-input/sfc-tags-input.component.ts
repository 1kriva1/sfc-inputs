import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import ValidationConstants from '../common/constants/validation-constants';
import { CollectionUtils } from '../common/utils/collection-utils';
import { CommonUtils } from '../common/utils/common-utils';

@Component({
    selector: 'sfc-tags-input',
    templateUrl: './sfc-tags-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-tags-input.component.css', './sfc-tags-input-dark-theme.component.css']
})
export class TagsInputComponent extends BaseInputComponent<string[]> implements OnInit {

    @Input('new-tag-placeholder')
    newTagPlaceholder: string = CommonConstants.TAGS_INPUT.NEW_TAG_PLACEHOLDER_DEFAULT;

    newTagValue: string = null;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        // add inner validations
        this.validations = { ...this.validations, ...ValidationConstants.DUPLICATE_VALIDATION, ...ValidationConstants.EMPTY_VALIDATION };
        this.value = this.value || [];
    }

    get tagPlaceholder() {
        if (CollectionUtils.any(this.value)) {
            return this.newTagPlaceholder && !this.isFocus ? this.newTagPlaceholder : this.placeholder;
        }

        return this.placeholder;
    }

    get labelClass(): any {
        return this._placeholder || this.isFocus || CollectionUtils.any(this.value) || !CommonUtils.isNullOrEmptyString(this.newTagValue) ? StyleClass.Active : '';
    }

    get containerClasses(): any {
        let classes = {};

        if (this.validationClass)
            classes[this.validationClass] = true;

        if (this.disabled)
            classes[StyleClass.Disabled] = true;

        return classes;
    }

    onBlur() {
        this.clearInnerErrors();
        super.onBlur();
    }

    /**
     * On component click focus new tag input
     */
    onClick() {
        if (this.elementRefInput) {
            this.elementRefInput.nativeElement.focus();
        }
    }

    onEnter() {
        this.clearInnerValidation();
        const newValue = CommonUtils.trim(this.newTagValue);

        if (!CommonUtils.isNullOrEmptyString(newValue)) {

            if (!CollectionUtils.hasItem(this.value, newValue)) {
                // add new tag
                this.addNewTag();
            } else {
                // add inner validation error (duplicate value)
                this.toggleInnerErrors(CommonConstants.DUPLICATE_VALIDATOR_KEY, true);
            }
        } else {
            // add inner validation error (empty value)
            this.toggleInnerErrors(CommonConstants.EMPTY_VALIDATOR_KEY, true);
        }
    }

    onRemove(removeValue: string) {
        CollectionUtils.removeItem(this.value, (item: string) => item === removeValue);
        this.onChange(this.value);
    }

    onNewTagInput(newTagValue: string) {
        this.newTagValue = newTagValue;
    }

    private addNewTag() {
        // add new tag
        this.value.push(this.newTagValue);

        // update component value with new value
        this.onChange(this.value);

        // clear new tag input
        this.newTagValue = null;
    }

    private clearInnerValidation() {
        this.toggleInnerErrors(CommonConstants.DUPLICATE_VALIDATOR_KEY, false);
        this.toggleInnerErrors(CommonConstants.EMPTY_VALIDATOR_KEY, false);
    }
}