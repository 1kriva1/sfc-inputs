import { Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, AfterViewInit, Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { InputPosition } from '../common/constants/common-constants';
import { CommonUtils } from '../common/utils/common-utils';

@Directive()
export default abstract class BaseRangeInputComponent extends BaseInputComponent<number> implements AfterViewInit {

    @Input()
    max: number = 100;

    @Input()
    min: number = 0;

    @Input()
    step: number = 1;

    @Input()
    tooltip: boolean = true;

    @Input("show-limits")
    showLimits: boolean = false;

    @Input("show-value")
    showValue: boolean = false;

    @Input("start-icon")
    startIcon: string;

    @Input("finish-icon")
    finishIcon: string;

    showTooltip: boolean = false;

    /**
     * Posible values: Vertical and Horizontal
     */
    abstract position: InputPosition;

    /**
     * Calculate CSS value (left) for tooltip component
     * @param newValue new value in percentage
     */
    abstract calculateLeftPosition(newValue: number): string;

    /**
     * Calculate position for tooltip component
     * @param newValue new value in percentage
     */
    abstract getNewPosition(newValue: number): number;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngAfterViewInit(): void {
        this.value = CommonUtils.isDefined(this.value) ? this.value : this.min;
        super.ngAfterViewInit();
    }

    get tooltipLeftPosition() {
        const newValue = Number((this.value - this.min) * 100 / (this.max - this.min));
        return this.calculateLeftPosition(newValue);
    };

    get showBeforeLabel() {
        return this.showLimits || !CommonUtils.isNullOrEmptyString(this.startIcon);
    }

    get showAfterLabel() {
        return this.showLimits || !CommonUtils.isNullOrEmptyString(this.finishIcon) || this.showValue;
    }

    onHover(show: boolean) {
        this.showTooltip = this.tooltip && show;
    }
}