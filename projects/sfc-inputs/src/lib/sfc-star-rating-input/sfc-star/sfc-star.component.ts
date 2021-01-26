import { Component, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { StarType, StyleClass } from '../../common/constants/common-constants';

@Component({
    selector: 'sfc-star',
    templateUrl: './sfc-star.component.html',
    styleUrls: ['./sfc-star.component.css', './sfc-star-dark-theme.component.css']
})
export class StarComponent {

    /**
     * star value
     */
    @Input()
    id: number;

    /**
    * star value
    */
    @Input()
    value: number;

    /**
     * star disabled
     */
    @Input()
    @HostBinding('class.disabled')
    disabled: boolean;

    /**
     * detect if star is selected
     */
    @Input()
    highlighted: boolean;

    /**
     * detect if last star was selected
     */
    @Input('highlighted-max')
    highlightedMax: boolean;

    /**
     * detect if first star was selected
     */
    @Input('highlighted-min')
    highlightedMin: boolean;

    /** 
     * identification of first star in star collection
    */
    @Input('first-star')
    firstStar: boolean;

    /** 
     * identification of last star in star collection
    */
    @Input('last-star')
    lastStar: boolean;

    /**
     * Parent handler for selecting star
     */
    @Output()
    checked = new EventEmitter<number>();

    /**
     * select star (notify parent component)
     */
    onChecked() {
        if (this.checked) {
            this.checked.emit(this.value);
        }
    }

    /**
     * classes for star (highlighted, max and min)
     * p.s. can't do it  by host-binding
     */
    get starClasses() {
        const clasess = {};

        if (this.disabled)
            clasess[StyleClass.Disabled] = true;

        if (this.highlighted)
            clasess[StarType.Highlighted] = true;        

        if (this.highlightedMin)
            clasess[StarType.HighlightedMin] = true;

        if (this.highlightedMax)
            clasess[StarType.HighlightedMax] = true;

        return clasess;
    }
}