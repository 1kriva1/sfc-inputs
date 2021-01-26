import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, OnInit, HostBinding } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import { CommonUtils } from '../common/utils/common-utils';

@Component({
    selector: 'sfc-number-spinner-input',
    templateUrl: './sfc-number-spinner-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-number-spinner-input.component.css', './sfc-number-spinner-input-dark-theme.component.css']
})
export class NumberSpinnerInputComponent extends BaseInputComponent<number> implements OnInit {

    /**
     * Maximum allowed value
     */
    @Input()
    max: number;

    /**
     * Minimum allowed value
     */
    @Input()
    min: number;

    /**
     * Iteration step
     */
    @Input()
    step: number = 1;

    /**
     * Component width fixed
     */
    @Input()
    @HostBinding('class.' + CommonConstants.CSS_CLASS_FIXED)
    fixed: boolean = false;

    /**
     * Prev and next buttons are fixed
     */
    @Input('fixed-actions')
    @HostBinding('class.fixed-actions')
    fixedActions: boolean = false;

    /**
     * Custom icon for next button
     */
    @Input('next-icon')
    nextIcon = 'fa fa-angle-right';

    /**
     * Custom icon for previous button
     */
    @Input('prev-icon')
    prevIcon = 'fa fa-angle-left';

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        this.value = CommonUtils.isDefined(this.value) ? this.value : this.min || 0;
    }

    /**
     * Next value
     */
    private get nextValue() {
        return this.value + this.step;
    }

    /**
     * Previous value
     */
    private get prevValue() {
        return this.value - this.step;
    }

    /**
     * Show next button when have limit of max or value is less then max
     */
    get showIncrement() {
        return !CommonUtils.isDefined(this.max) || this.nextValue <= this.max;
    }

    /**
     * Show prev button when have limit of min or value is more then min
     */
    get showDecrement() {
        return !CommonUtils.isDefined(this.min) || this.prevValue >= this.min;
    }

    /**
     * need for dark mode theme
     */
    get containerClass() {
        const classes = {}

        if (this.disabled)
            classes[StyleClass.Disabled] = true;

        return classes;
    }

    /**
     * Increment value by step
     */
    increment() {
        this.updateValue(this.nextValue);
    }

    /**
     * Decrement value by step
     */
    decrement() {
        this.updateValue(this.prevValue);
    }

    /**
     * Update value
     * @param newValue New value
     */
    private updateValue(newValue: number) {
        if (this.validateValue(newValue)) {
            super.onChange(newValue);
        }
    }

    /**
     * Validate value by max and min limits
     * @param newValue New value to validate
     */
    private validateValue(newValue: number) {
        return (!CommonUtils.isDefined(this.min) || newValue >= this.min)
            && (!CommonUtils.isDefined(this.max) || newValue <= this.max);
    }
}