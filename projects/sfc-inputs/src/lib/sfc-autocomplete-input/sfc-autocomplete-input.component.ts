import { Component, Self, Optional, ChangeDetectorRef, ElementRef, Renderer2, OnInit, Input, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import { CommonUtils } from '../common/utils/common-utils';
import { CommonConstants, StyleClass } from '../common/constants/common-constants';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
import IAutoCompleteData from '../common/interfaces/autocomplete-input/IAutoCompleteData';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';
import IAutoCompleteValue from '../common/interfaces/autocomplete-input/IAutoCompleteValue';
import { CollectionUtils } from '../common/utils/collection-utils';
import ValidationConstants from '../common/constants/validation-constants';
import IAutoCompleteParameters from '../common/interfaces/autocomplete-input/IAutoCompleteParameters';
import { LoadMoreDropDownComponent } from '../common/components/load-more-dropdown/sfc-load-more-dropdown.component';
import { LoadMoreUtils } from '../common/utils/load-more-utils';

@Component({
    selector: 'sfc-autocomplete-input',
    templateUrl: './sfc-autocomplete-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css',
        './sfc-autocomplete-input.component.css', './sfc-autocomplete-input-dark-theme.component.css']
})
export class AutoCompleteInputComponent extends BaseInputComponent<IAutoCompleteValue> implements OnInit {

    /**
     * time between key up events on input
     */
    @Input('debounce-time')
    debounceTime: number = 1000;

    /**
     * start get possible values after such chars
     */
    @Input('chars-to-call')
    charCounter: number = 1;

    /**
     * load data function
     */
    @Input()
    loader: (parameters: IAutoCompleteParameters) => Observable<ILoadMoreData<IAutoCompleteData>>;

    // static or observable data
    @Input('data')
    data: IAutoCompleteData[] | Observable<ILoadMoreData<IAutoCompleteData>>;

    // TODO !!!
    // @Input('http-data-config')
    // httpConfig: HttpConfig<ILoadMoreData<IAutoCompleteData>>;

    /**
     * load more data with show more button (otherwise will use infinity scroller)
     */
    @Input('load-more-button')
    loadMoreButton: boolean = true;

    /**
     * load more dropdown reference
     */
    @ViewChild('dropdown', { static: false, read: LoadMoreDropDownComponent })
    private loadMoreDropdown: LoadMoreDropDownComponent;

    /**
     * detect if if items exist for entire value
     */
    hasItems: boolean = false;

    // data items
    localData: any[];

    // parameterezied loader function
    loaderWithParameters: (parameters: IAutoCompleteParameters) => Observable<ILoadMoreData<IAutoCompleteData>>;

    /**
     * text input value
     */
    displayValue: string = '';

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        // add inner validations
        this.validations = { ...this.validations, ...ValidationConstants.DATA_VALIDATION };
        this.value = !CommonUtils.isDefined(this.value)
            ? { displayValue: this.displayValue, key: null }
            : this.value;
        this.displayValue = this.value.displayValue;

        this.setLoader();
    }

    ngAfterViewInit() {
        this.initInputEvent();
        super.ngAfterViewInit();
    }

    get labelClass(): any {
        return this._placeholder || this.isFocus
            || this.value.key || this.value.displayValue ? StyleClass.Active : '';
    }

    get isReadOnly() {
        return CommonUtils.isDefined(this.loadMoreDropdown) ? this.loadMoreDropdown.isLoadingData : false;
    }

    private setLoader() {
        if (CommonUtils.isDefined(this.loader)) {
            this.loaderWithParameters = (parameters: IAutoCompleteParameters) => this.loader(parameters || { value: this.displayValue });
        } else if (CommonUtils.isDefined(this.data) && !CommonUtils.isAsyncData(this.data)) {
            this.loaderWithParameters = LoadMoreUtils.getStaticDataLoadFunction(this.data as IAutoCompleteData[], (item: IAutoCompleteData) => CommonUtils.contains(item.value, this.displayValue));
        }
    }

    private initInputEvent() {
        const autoCompleteInputEvent$ = fromEvent(this.elementRefInput.nativeElement, 'input')
            .pipe(
                // get value
                map((event: any) => {
                    return { value: event.target.value, page: 1 } as IAutoCompleteParameters
                })

                // time in milliseconds between key events
                , debounceTime(this.debounceTime)

                // update display value
                , tap(res => this.updateDisplayValue(res.value))

                // if character length greater then 1
                , filter(res => res.value.length >= this.charCounter)
            );

        this.loadMoreDropdown.exhaust(autoCompleteInputEvent$);
    }

    private updateDisplayValue(newValue: string) {
        this.displayValue = newValue;
        this.onChangeValue(newValue, null);
    }

    handleError() {
        // add inner validation error (data error)
        this.toggleInnerErrors(CommonConstants.DATA_VALIDATOR_KEY, true);
    }

    handleSuccess(result: ILoadMoreData<IAutoCompleteData>) {
        this.toggleInnerErrors(CommonConstants.DATA_VALIDATOR_KEY, false);
        this.localData = result.Items;
        this.hasItems = CollectionUtils.any(result.Items);

        this.setValueWhenValueFit(result.Items);
    }

    handleUpdate(result: ILoadMoreData<IAutoCompleteData>) {
        this.localData = this.localData.concat(result.Items);
    }

    setOptionValue(item: IAutoCompleteData): void {
        this.displayValue = item.value;
        this.onChangeValue(item.value, item.key);
    }

    private setValueWhenValueFit(result: Array<IAutoCompleteData>) {
        const foundItem = CollectionUtils.getItem(result, (item) => item.value === this.displayValue);

        if (CommonUtils.isDefined(foundItem)) {
            this.onChangeValue(foundItem.value, foundItem.key);
        }
    }

    private onChangeValue(value: string, key: any) {
        const newValue: IAutoCompleteValue = { displayValue: value, key: key };
        super.onChange(newValue);
    }
}