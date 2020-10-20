import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { InputPosition } from '../../common/constants/common-constants';
import BaseRangeInputComponent from '../sfc-base-range-input.component';

@Component({
    selector: 'sfc-range-horizontal-input',
    templateUrl: './sfc-range-horizontal-input.component.html',
    styleUrls: ['../../common/styles/sfc-base-input.component.css', '../../common/styles/sfc-base-input-dark-theme.component.css',
        '../sfc-base-range-input.component.css', '../sfc-base-range-input-dark-theme.component.css',
        './sfc-range-horizontal-input.component.css']
})
export class RangeHorizontalInputComponent extends BaseRangeInputComponent {

    position: InputPosition = InputPosition.Horizontal;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    calculateLeftPosition(newValue: number): string {
        const newPosition = this.getNewPosition(newValue);

        if (this.icon) {
            const iconLeftPosition = 48 - (newValue * 0.48);
            return `calc(${newValue}% + (${newPosition}px) + (${iconLeftPosition}px) )`;
        } else {
            return `calc(${newValue}% + (${newPosition}px) )`;
        }
    }

    getNewPosition(newValue: number): number {
        if (this.showLimits || (this.startIcon && this.finishIcon)) {
            return 44 - (newValue * 0.98);
        } else if (this.startIcon && !this.finishIcon) {
            return 44 - (newValue * 0.56);
        } else if (this.showValue || (!this.startIcon && this.finishIcon)) {
            return 12 - (newValue * 0.67);
        } else {
            return 12 - (newValue * 0.245);
        }
    }
}