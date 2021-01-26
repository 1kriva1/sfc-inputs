import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { InputPosition, StyleClass } from '../common/constants/common-constants';
import { animate, style, transition, trigger } from '@angular/animations';
import { CollectionUtils } from '../common/utils/collection-utils';

@Component({
    selector: 'sfc-star-rating-input',
    templateUrl: './sfc-star-rating-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-star-rating-input.component.css', './sfc-star-rating-input-dark-theme.component.css'],
    animations: [
        trigger('counterAnimation', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate(800)
            ]),
            transition(':leave',
                animate(0, style({ opacity: 0 })))
        ])
    ]
})
export class StarRatingInputComponent extends BaseInputComponent<number> implements OnInit {

    /**
     * show/hide selected star counter
     */
    @Input('show-counter')
    showCounter: boolean = false;

    /**
     * show/hide reset button
     */
    @Input('show-reset')
    showReset: boolean = false;

    /**
     * Posible values: Vertical and Horizontal
     */
    @Input()
    position: InputPosition = InputPosition.Horizontal;

    // component data (simple array of possible values for stars)
    @Input()
    items: number[];

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        // sort data in asc
        if (CollectionUtils.any(this.items)) {
            this.items = this.items.sort((n1, n2) => n1 - n2);
        }
    }

    /**
     * show/hide counter/reset-button when star was selected
     */
    get actionClass() {
        const classes = {}

        if ((this.showReset || this.showCounter) && this.isValueDefined) {
            classes[StyleClass.Active] = true;
        }

        return classes;
    }

    /**
     * show/hide counter/reset-button when star was selected
     */
    get containerClass() {
        const classes = {}

        if (this.validationClass)
            classes[this.validationClass] = true;

        classes[this.position] = true;

        return classes;
    }

    /**
     * parse newValue to number type
     * @param newValue new value from star
     */
    onChecked(newValue: number) {
        this.onChange(+newValue);
    }

    /**
     * reset value to NULL
     */
    onReset() {
        this.onChange(null);
    }

    /**
     * highlight before selected stars
     * @param item star item
     */
    isHighlighted(item: number) {
        return this.isValueDefined
            && this.value >= item;
    }

    /**
     * highlight if selected last star
     */
    get isHighlightedMax() {
        return this.isValueDefined
            && CollectionUtils.any(this.items)
            && CollectionUtils.lastItem(this.items) === this.value;
    }

    /**
     * highlight if selected first star
     * @param item star item
     */
    isHighlightedMin(item: number) {
        return this.isValueDefined
            && CollectionUtils.any(this.items)
            && CollectionUtils.firstItem(this.items) === item
            && item === this.value;
    }

    /**
     * selected star index
     */
    get starsIndex() {
        return this.isValueDefined && CollectionUtils.any(this.items)
            ? this.items.indexOf(this.value) + 1
            : null;
    }

    /**
     * count of stars
     */
    get starsCount() {
        return CollectionUtils.any(this.items) ? this.items.length : 0;
    }
}