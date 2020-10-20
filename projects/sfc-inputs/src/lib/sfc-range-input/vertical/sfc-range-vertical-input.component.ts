import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputPosition, StyleClass } from '../../common/constants/common-constants';
import { UIUtils } from '../../common/utils/ui-utils';
import BaseRangeInputComponent from '../sfc-base-range-input.component';

@Component({
    selector: 'sfc-range-vertical-input',
    templateUrl: './sfc-range-vertical-input.component.html',
    styleUrls: ['../../common/styles/sfc-base-input.component.css', '../../common/styles/sfc-base-input-dark-theme.component.css',
        '../sfc-base-range-input.component.css', '../sfc-base-range-input-dark-theme.component.css',
        './sfc-range-vertical-input.component.css', './sfc-range-vertical-input-dark-theme.component.css']
})
export class RangeVerticalInputComponent extends BaseRangeInputComponent {

    position: InputPosition = InputPosition.Vertical;

    @ViewChild('verticalContainer', { static: false, read: ElementRef })
    protected verticalContainer: ElementRef;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    private get containerHeight(): string {
        if (this.verticalContainer) {
            const rangeInputEl = this.verticalContainer.nativeElement.querySelector("input");
            return rangeInputEl
                ? UIUtils.getCssLikePx(rangeInputEl.getBoundingClientRect().height)
                : null;
        }

        return null;
    }

    private get containerClasses() {
        const classes = {};

        if (this.validationClass)
            classes[this.validationClass] = true;

        // angular not supported :host-context and :host together
        if (this.disabled)
            classes[StyleClass.Disabled] = true;

        // angular not supported :host-context and :host together
        if (this.isFocus)
            classes[StyleClass.Focus] = true;

        return classes;
    }

    calculateLeftPosition(newValue: number): string {
        return `calc(${newValue}% + (${this.getNewPosition(newValue)}px) )`;
    }

    getNewPosition(newValue: number): number {
        if (this.showLimits || this.startIcon || this.finishIcon) {
            return 12 - (newValue * 0.26);
        } else {
            return 12 - (newValue * 0.245);
        }
    }
}