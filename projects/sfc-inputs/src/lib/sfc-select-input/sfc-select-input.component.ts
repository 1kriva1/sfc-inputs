import { Component, Self, Optional, ChangeDetectorRef, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, Renderer2, ViewChildren, QueryList, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import BaseInputComponent from '../common/components/sfc-base-input.component';
import ISelectData from '../common/interfaces/select-input/ISelectData';
import { CommonConstants } from '../common/constants/common-constants';
import ISelectDataGroup from '../common/interfaces/select-input/ISelectDataGroup';
import { CollectionUtils } from '../common/utils/collection-utils';
import { Observable } from 'rxjs';
import { CommonUtils } from '../common/utils/common-utils';
import { ILoadMoreData } from '../common/interfaces/ILoadMoreData';
import IOptGroupValue from '../common/interfaces/select-input/IOptGroupValue';
import IOptGroupOption from '../common/interfaces/select-input/IOptGroupOption';
import { HttpConfig } from '../common/utils/http-config';
import { LoadMoreDropDownComponent } from '../common/components/load-more-dropdown/sfc-load-more-dropdown.component';
import { SelectItemComponent } from './select-item/sfc-select-item.component';
import ValidationConstants from '../common/constants/validation-constants';

@Component({
    selector: 'sfc-select-input',
    templateUrl: './sfc-select-input.component.html',
    styleUrls: ['../common/styles/sfc-base-input.component.css', '../common/styles/sfc-base-input-dark-theme.component.css', './sfc-select-input.component.css', './sfc-select-input-dark-theme.component.css']
})
export class SelectInputComponent extends BaseInputComponent<string | Array<string> | IOptGroupValue>
    implements OnInit, AfterViewInit, OnChanges {

    @Input('default-display-value')
    defaultDisplayValue: ISelectData = { value: CommonConstants.SELECT_INPUT.DEFAULT_OPTION_VALUE, key: -1, isDefault: true };

    @Input('show-default-option')
    showDefaultOption: boolean = true;

    // TRUE - multiple selection
    @Input()
    multiple: boolean = false;

    // load data (subscribe) on component init
    @Input('load-on-init')
    isLoadOnInit: boolean = false;

    // component data (simple array of objects or obsevable)
    @Input()
    data: ISelectData[] | ISelectDataGroup[] | Observable<ILoadMoreData<ISelectData | ISelectDataGroup>>;

    // function for pageable data loading
    @Input()
    loader: () => Observable<ILoadMoreData<ISelectData | ISelectDataGroup>>;

    @Input('load-more-button')
    loadMoreButton: boolean = false;

    @Input('http-data-config')
    httpConfig: HttpConfig<ILoadMoreData<ISelectData | ISelectDataGroup>>;

    // label element reference
    @ViewChild('labelFocused', { static: false })
    private labelElement: ElementRef;

    @ViewChild('dropdown', { static: false, read: LoadMoreDropDownComponent })
    private loadMoreDropdown: LoadMoreDropDownComponent;

    @ViewChildren('items')
    private dropdownItems: QueryList<any>;

    // local variable to store data
    private localData: any[];

    // check if data was loaded initialy
    private isLoadedData: boolean = false;

    // dropdown already scrolled to selected item
    private isScrolledToSelected = false;

    constructor(@Self() @Optional() protected ngControl: NgControl,
        protected changeDetector: ChangeDetectorRef,
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        super(ngControl, changeDetector, renderer, elementRef);
    }

    ngOnInit(): void {
        // add inner validations
        this.validations = { ...this.validations, ...ValidationConstants.DATA_VALIDATION };
        this.initData(null);
    }

    ngAfterViewInit(): void {
        if (this.isLoadDataOnInit) {
            this.loadMoreDropdown.loadData();
        }

        this.setOnFocusEvent(this.labelElement.nativeElement);
        super.ngAfterViewInit();
    }

    ngOnChanges(changes: any) {
        // if data changes update local data
        if (changes.data && !changes.data.firstChange) {
            this.initData(changes.data.currentValue);
        }
    }

    protected get isValueDefined() {
        return this.multiple ? CollectionUtils.any(this.value as Array<string>) : CommonUtils.isDefined(this.value);
    }

    // need load async data only if value defined or need load on init
    private get isLoadDataOnInit(): boolean {
        return this.isLoadOnInit || this.isValueDefined;
    }

    // check if component must behave as group select
    private get isOptGroup(): boolean {
        return CollectionUtils.hasObjectItem(this.localData, 'isOptGroup', true);
    }

    // get value to display (single, multiple and grouped)
    private get displayValue(): string {
        if (this.isOptGroup) {
            return this.getDisplayValue((item: IOptGroupOption) => {
                let optGroupValue = this.value as IOptGroupValue;
                return this.value
                    && item.key === optGroupValue.key
                    && item.groupKey === optGroupValue.groupKey
            });
        } else if (this.multiple) {
            return this.getMultipleDisplayValue();
        } else {
            return this.getDisplayValue(i => i.key === this.value);
        }
    }

    private get defaultDisplayKey() {
        return CommonUtils.isDefined(this.defaultDisplayValue) ? this.defaultDisplayValue.key : null;
    }

    /**
     * open dropdown handler
     */
    private openDropdown() {
        if (!this.isLoadDataOnInit && !this.isLoadedData) {
            this.loadMoreDropdown.loadData();
        }

        if (this.isValueDefined && !this.isScrolledToSelected) {
            this.scrollToSelected();
        }
    }

    private scrollToSelected() {
        if (CommonUtils.isDefined(this.dropdownItems)) {
            let selectedItem = this.dropdownItems.find((item: SelectItemComponent) => item.isSelected);
            if (CommonUtils.isDefined(selectedItem)) {
                this.loadMoreDropdown.scrollToSelected(selectedItem.elementRef.nativeElement);
                this.isScrolledToSelected = true;
            }
        }
    }

    /**
     * handle full data load
     * @param result ILoadMoreData entity
     */
    private handleSuccess(result: ILoadMoreData<ISelectData | ISelectDataGroup>) {
        this.toggleInnerErrors(CommonConstants.DATA_VALIDATOR_KEY, false);
        this.initData(result.Items);
        this.isLoadedData = true;
    }

    /**
     * handle load data error
     */
    private handleError() {
        // add inner validation error (data error)
        this.toggleInnerErrors(CommonConstants.DATA_VALIDATOR_KEY, true);
    }

    /**
     * handle load more action
     * @param result ILoadMoreData entity
     */
    private handleUpdate(result: ILoadMoreData<ISelectData | ISelectDataGroup>) {
        this.localData = this.localData.concat(result.Items);
    }

    private initData(data: any) {
        this.localData = Object.assign([], data);

        if (CollectionUtils.any(this.localData) && 'options' in this.localData[0]) {
            this.prepareOptGroupData();
        }

        this.setDefaultOption();
    }

    private setDefaultOption() {
        if (this.showDefaultOption) {

            if (!CommonUtils.isDefined(this.defaultDisplayValue.isDefault)) {
                this.defaultDisplayValue.isDefault = true;
            }

            this.localData.unshift(this.defaultDisplayValue);
        }
    }

    private getDisplayValue(predicate: (n: ISelectData) => boolean) {
        if (this.isValueDefined) {
            const item = CollectionUtils.getItem<ISelectData>(this.localData, predicate);
            return item ? item.value : null;
        }

        return null;
    }

    // OPT GROUP

    private prepareOptGroupData() {
        const innerData: ISelectDataGroup[] = this.localData;
        this.localData = [] as IOptGroupOption[];

        for (let group of innerData) {
            this.localData.push({ value: group.value, key: group.key, isOptGroup: true });
            group.options.forEach(element => {
                element.isOptGroupOption = true;
                element.groupKey = group.key
            });

            this.localData = this.localData.concat(group.options);
        }
    }

    // END OPT GROUP

    // MULTIPLE

    private getMultipleDisplayValue() {
        let selectedItemsKeys = this.value as Array<string>;
        if (CollectionUtils.any(this.localData) && CollectionUtils.any(selectedItemsKeys)) {
            let selectedValues = [];

            this.localData.forEach(function (item) {
                let findItem = selectedItemsKeys.find(i => i === item.key);

                if (findItem || (findItem === null && item.isDefault)) {
                    selectedValues.push(item.value);
                }
            });

            return selectedValues.join(', ');
        }
    }

    // END MULTIPLE
}