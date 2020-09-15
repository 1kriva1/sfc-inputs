import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { IconType } from '../common/constants/common-constants';
import IToggleLabelConfig from '../common/interfaces/toggle-input/IToggleLabelConfig';

@Component({
    selector: 'sfc-toggle-input',
    templateUrl: './sfc-toggle-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-toggle-input.component.css', './sfc-toggle-input-dark-theme.component.css']
})
export class ToggleInputComponent extends BaseInputComponent<boolean> {

    @Input('negative-icon')
    negativeIcon: string = IconType.Negative;

    @Input('positive-icon')
    positiveIcon: string = IconType.Positive;

    @Input('label-config')
    labelConfig: IToggleLabelConfig;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    private get displayValue(): string {
        return this.labelConfig ? this.labelConfig.positiveLabel : this.label || this._placeholder;
    }
}