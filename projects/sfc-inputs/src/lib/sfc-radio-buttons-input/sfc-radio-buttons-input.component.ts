import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonUtils } from '../common/utils/common-utils';
import { InputPosition, RadioButtonsInputLabelType } from '../common/constants/common-constants';
import IRadioButtonsData from '../common/interfaces/radio-buttons/IRadioButtonsData';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'sfc-radio-buttons-input',
    templateUrl: './sfc-radio-buttons-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-radio-buttons-input.component.css', './sfc-radio-buttons-input-dark-theme.component.css']
})
export class RadioButtonsInputComponent extends BaseInputComponent<number | string> implements OnInit {

    /**
     * Posible values: Vertical and Horizontal
     */
    @Input()
    position: InputPosition = InputPosition.Vertical;

    // component data (simple array of objects or obsevable)
    @Input()
    data: IRadioButtonsData[] | Observable<IRadioButtonsData[]>;

    data$: Observable<IRadioButtonsData[]>;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        this.data$ = (CommonUtils.isAsyncData(this.data) ? this.data : of(this.data)) as Observable<IRadioButtonsData[]>;
        this.setValueFromDefault();
    }

    radioButtonLabelClass(item: IRadioButtonsData) {
        return CommonUtils.isNullOrEmptyString(item.icon) ? RadioButtonsInputLabelType.Circle : RadioButtonsInputLabelType.Icons;
    }

    isCheckedItem(item: IRadioButtonsData) {
        return CommonUtils.isDefined(this.value) ? this.value === item.key : item.isDefault;
    }

    private setValueFromDefault() {
        if (!CommonUtils.isDefined(this.value)) {
            this.data$.pipe(
                map(items => items.find(item => item.isDefault)),
                tap((defaultItem: IRadioButtonsData) => {
                    if (defaultItem) {
                        this.onChange(defaultItem.key);
                    }
                })
            );
        }
    }
}